# 🚀 Supabase Integration Setup Guide for PromptPilot

## 📋 Overview

This guide will help you integrate Supabase database into your PromptPilot application. The system is designed to automatically fallback to in-memory database if Supabase is not configured, ensuring your app always works.

## 🔧 What I've Already Done (Automated)

### ✅ Backend Code Updates
- ✅ Added Supabase dependencies to `requirements.txt`
- ✅ Created `supabase_config.py` with database operations
- ✅ Created `supabase_schema.sql` with complete database schema
- ✅ Updated `database.py` with fallback mechanism
- ✅ Modified `server.py` to work with both database types
- ✅ Updated all API endpoints to support Supabase
- ✅ Implemented automatic fallback to in-memory database

### ✅ Features Implemented
- ✅ User registration and authentication
- ✅ Prompt storage and retrieval
- ✅ Analytics events tracking
- ✅ Session management
- ✅ Data export/deletion requests
- ✅ Row Level Security (RLS) policies
- ✅ Automatic timestamp updates

## 🎯 Manual Steps You Need to Do

### Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign up or log in to your account

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project name: `promptpilot-db`
   - Set a strong database password (save this!)
   - Choose your region (closest to your users)
   - Click "Create new project"

3. **Wait for Setup**
   - Project creation takes 1-2 minutes
   - You'll see a progress indicator

### Step 2: Get Your Credentials

1. **Navigate to Settings**
   - In your project dashboard, click "Settings" (gear icon)
   - Go to "API" section

2. **Copy These Values**
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (keep this secret!)

### Step 3: Set Up Database Schema

1. **Open SQL Editor**
   - In your Supabase dashboard, click "SQL Editor"
   - Click "New Query"

2. **Run the Schema**
   - Copy the entire content from `backend/supabase_schema.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute
   - You should see "Success. No rows returned" message

3. **Verify Tables Created**
   - Go to "Table Editor" in the sidebar
   - You should see these tables:
     - `users`
     - `prompts`
     - `analytics_events`
     - `user_sessions`
     - `daily_metrics`
     - `data_export_requests`
     - `data_deletion_requests`

### Step 4: Configure Environment Variables

1. **Update Backend .env File**
   - Open `backend/.env` file
   - Add these lines (replace with your actual values):

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here

# Keep your existing variables
SECRET_KEY=your-existing-secret-key
```

2. **Important Security Notes**
   - Never commit the service role key to version control
   - The anon key is safe for frontend use
   - Use environment variables in production

### Step 5: Install Dependencies

1. **Install New Python Packages**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Verify Installation**
   ```bash
   python -c "import supabase; print('Supabase installed successfully')"
   ```

### Step 6: Test the Integration

1. **Start Your Backend**
   ```bash
   cd backend
   python server.py
   ```

2. **Check the Logs**
   - Look for: `✅ Supabase database connected successfully`
   - If you see: `🚀 Using in-memory database (fallback)` - check your credentials

3. **Test Database Status**
   - Register a new user in your frontend
   - Check if the user appears in Supabase Table Editor
   - Generate a prompt and verify it's stored

## 🔍 Troubleshooting

### Issue: "Supabase connection failed"

**Solutions:**
1. **Check Credentials**
   - Verify SUPABASE_URL and SUPABASE_ANON_KEY in .env
   - Ensure no extra spaces or quotes

2. **Check Network**
   - Ensure internet connection
   - Check if Supabase is accessible from your location

3. **Check Project Status**
   - Verify your Supabase project is active
   - Check if you've exceeded free tier limits

### Issue: "Table doesn't exist"

**Solutions:**
1. **Re-run Schema**
   - Copy and run `supabase_schema.sql` again
   - Check for any SQL errors in the output

2. **Check Table Names**
   - Verify table names match exactly (case-sensitive)
   - Ensure all tables were created successfully

### Issue: "Permission denied"

**Solutions:**
1. **Check RLS Policies**
   - Ensure Row Level Security policies are set up correctly
   - Verify user authentication is working

2. **Check API Keys**
   - Use the correct anon key for client operations
   - Ensure service key is only used server-side

## 🎯 Verification Checklist

### ✅ Database Setup
- [ ] Supabase project created
- [ ] Database schema executed successfully
- [ ] All 7 tables visible in Table Editor
- [ ] Environment variables configured
- [ ] Dependencies installed

### ✅ Application Testing
- [ ] Backend starts without errors
- [ ] Logs show "Supabase database connected successfully"
- [ ] User registration works
- [ ] User login works
- [ ] Prompt generation and storage works
- [ ] Prompt history displays correctly
- [ ] Database status endpoint shows "supabase"

### ✅ Data Verification
- [ ] New users appear in Supabase `users` table
- [ ] Generated prompts appear in `prompts` table
- [ ] User IDs are properly linked between tables
- [ ] Timestamps are correctly set

## 🚀 Next Steps After Setup

### 1. **Production Deployment**
- Set up environment variables in your hosting platform
- Use Supabase production credentials
- Enable SSL/TLS for secure connections

### 2. **Monitoring & Analytics**
- Set up Supabase monitoring
- Configure database backups
- Monitor query performance

### 3. **Advanced Features**
- Implement real-time subscriptions
- Add database triggers for automation
- Set up advanced analytics queries

## 🎊 Benefits of Supabase Integration

### ✅ **Data Persistence**
- User data survives server restarts
- Reliable data storage and retrieval
- Automatic backups and recovery

### ✅ **Scalability**
- Handles thousands of users
- Automatic scaling based on usage
- Professional-grade database performance

### ✅ **Security**
- Row Level Security (RLS) policies
- Built-in authentication integration
- Secure API access controls

### ✅ **Development Experience**
- Real-time database dashboard
- SQL editor for custom queries
- Automatic API generation

---

## 🆘 Need Help?

If you encounter any issues:

1. **Check the logs** - Backend logs will show connection status
2. **Verify credentials** - Double-check your Supabase URL and keys
3. **Test step by step** - Follow each step carefully
4. **Fallback works** - Your app will work with in-memory database if Supabase fails

**Your PromptPilot will automatically use Supabase when configured correctly, or fallback to in-memory database to ensure it always works!**