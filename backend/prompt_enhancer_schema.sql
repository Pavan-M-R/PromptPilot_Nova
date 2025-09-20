-- Prompt Enhancer Database Schema
-- This schema creates tables for storing prompt enhancement sessions and related data

-- Create prompt_sessions table to store all prompt enhancement data
CREATE TABLE IF NOT EXISTS prompt_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_id VARCHAR(255),
    original_prompt TEXT NOT NULL,
    enhanced_prompt TEXT NOT NULL,
    detected_intent VARCHAR(50) NOT NULL,
    assigned_role TEXT NOT NULL,
    llm_response TEXT NOT NULL,
    llm_used VARCHAR(50) NOT NULL,
    processing_time DECIMAL(10, 4) NOT NULL,
    context TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_prompt_sessions_user_id ON prompt_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_prompt_sessions_created_at ON prompt_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prompt_sessions_intent ON prompt_sessions(detected_intent);
CREATE INDEX IF NOT EXISTS idx_prompt_sessions_llm_used ON prompt_sessions(llm_used);
CREATE INDEX IF NOT EXISTS idx_prompt_sessions_session_id ON prompt_sessions(session_id);

-- Create intent_analytics table for tracking intent detection accuracy and patterns
CREATE TABLE IF NOT EXISTS intent_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(255) REFERENCES prompt_sessions(session_id),
    detected_intent VARCHAR(50) NOT NULL,
    confidence_score DECIMAL(3, 2),
    pattern_matched BOOLEAN DEFAULT FALSE,
    llm_classified BOOLEAN DEFAULT FALSE,
    user_feedback VARCHAR(20), -- 'correct', 'incorrect', 'partially_correct'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create llm_performance table for tracking LLM performance and fallback statistics
CREATE TABLE IF NOT EXISTS llm_performance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(255) REFERENCES prompt_sessions(session_id),
    llm_provider VARCHAR(50) NOT NULL,
    attempt_order INTEGER NOT NULL, -- 1 for primary, 2 for first fallback, etc.
    success BOOLEAN NOT NULL,
    error_message TEXT,
    response_time DECIMAL(10, 4),
    token_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_preferences table for storing user-specific prompt enhancement preferences
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE NOT NULL,
    preferred_llm VARCHAR(50),
    default_context TEXT,
    custom_roles JSONB, -- Store custom role mappings
    intent_overrides JSONB, -- Store user-defined intent classifications
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prompt_templates table for storing reusable prompt templates
CREATE TABLE IF NOT EXISTS prompt_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    intent_type VARCHAR(50) NOT NULL,
    template_content TEXT NOT NULL,
    variables JSONB, -- Store template variables and their descriptions
    is_public BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(255),
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
DROP TRIGGER IF EXISTS update_prompt_sessions_updated_at ON prompt_sessions;
CREATE TRIGGER update_prompt_sessions_updated_at
    BEFORE UPDATE ON prompt_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER update_user_preferences_updated_at
    BEFORE UPDATE ON user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_prompt_templates_updated_at ON prompt_templates;
CREATE TRIGGER update_prompt_templates_updated_at
    BEFORE UPDATE ON prompt_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some default prompt templates
INSERT INTO prompt_templates (name, description, intent_type, template_content, variables, is_public, created_by) VALUES
(
    'Code Review Template',
    'Template for code review and improvement suggestions',
    'coding',
    'You are a Senior Code Reviewer. Review the following code and provide detailed feedback on: 1) Code quality and best practices, 2) Potential bugs or issues, 3) Performance optimizations, 4) Security considerations. Code to review: {{code}}',
    '{"code": "The code to be reviewed"}',
    true,
    'system'
),
(
    'Technical Documentation Template',
    'Template for creating comprehensive technical documentation',
    'writing',
    'You are a Technical Documentation Expert. Create comprehensive documentation for: {{topic}}. Include: 1) Overview and purpose, 2) Prerequisites, 3) Step-by-step instructions, 4) Examples, 5) Troubleshooting section, 6) Best practices.',
    '{"topic": "The topic or feature to document"}',
    true,
    'system'
),
(
    'Problem Solving Template',
    'Template for systematic problem solving approach',
    'problem_solving',
    'You are a Strategic Problem Solver. Analyze this problem: {{problem}}. Provide: 1) Problem breakdown, 2) Root cause analysis, 3) Multiple solution approaches, 4) Pros and cons of each approach, 5) Recommended solution with implementation steps.',
    '{"problem": "The problem to be solved"}',
    true,
    'system'
);

-- Create view for session analytics
CREATE OR REPLACE VIEW session_analytics AS
SELECT 
    DATE_TRUNC('day', created_at) as date,
    detected_intent,
    llm_used,
    COUNT(*) as session_count,
    AVG(processing_time) as avg_processing_time,
    MIN(processing_time) as min_processing_time,
    MAX(processing_time) as max_processing_time
FROM prompt_sessions
GROUP BY DATE_TRUNC('day', created_at), detected_intent, llm_used
ORDER BY date DESC, session_count DESC;

-- Create view for user activity summary
CREATE OR REPLACE VIEW user_activity_summary AS
SELECT 
    user_id,
    COUNT(*) as total_sessions,
    COUNT(DISTINCT detected_intent) as unique_intents_used,
    AVG(processing_time) as avg_processing_time,
    MAX(created_at) as last_activity,
    MIN(created_at) as first_activity
FROM prompt_sessions
WHERE user_id IS NOT NULL
GROUP BY user_id
ORDER BY total_sessions DESC;

-- Comments for documentation
COMMENT ON TABLE prompt_sessions IS 'Stores all prompt enhancement sessions with original prompts, enhanced prompts, and LLM responses';
COMMENT ON TABLE intent_analytics IS 'Tracks intent detection accuracy and classification methods';
COMMENT ON TABLE llm_performance IS 'Monitors LLM performance, fallback usage, and error tracking';
COMMENT ON TABLE user_preferences IS 'Stores user-specific preferences for prompt enhancement';
COMMENT ON TABLE prompt_templates IS 'Reusable prompt templates for different intent types';

COMMENT ON COLUMN prompt_sessions.session_id IS 'Unique identifier for each prompt enhancement session';
COMMENT ON COLUMN prompt_sessions.processing_time IS 'Time taken to process the prompt in seconds';
COMMENT ON COLUMN intent_analytics.confidence_score IS 'Confidence score for intent detection (0.00 to 1.00)';
COMMENT ON COLUMN llm_performance.attempt_order IS 'Order of LLM attempt (1=primary, 2=first fallback, etc.)';