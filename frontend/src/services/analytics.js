// Professional Analytics Service for PromptPilot

class AnalyticsService {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.isEnabled = true;
    this.eventQueue = [];
    this.API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
    
    // Initialize session tracking
    this.initializeSession();
  }

  generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  initializeSession() {
    // Track page load
    this.trackEvent('session_started', {
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('page_hidden', {
          duration: Date.now() - this.startTime
        });
      } else {
        this.trackEvent('page_visible', {});
        this.startTime = Date.now();
      }
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.trackEvent('session_ended', {
        duration: Date.now() - this.startTime,
        events_tracked: this.eventQueue.length
      });
      this.flushEvents();
    });
  }

  async trackEvent(eventType, eventData = {}) {
    if (!this.isEnabled) return;

    try {
      const event = {
        event_type: eventType,
        event_data: {
          ...eventData,
          session_id: this.sessionId,
          timestamp: new Date().toISOString(),
          page_url: window.location.href,
          referrer: document.referrer
        },
        session_id: this.sessionId,
        page_url: window.location.href,
        device_info: {
          screen_resolution: `${screen.width}x${screen.height}`,
          browser: this.getBrowserInfo(),
          os: this.getOSInfo(),
          device_type: this.getDeviceType()
        }
      };

      // Add to queue for batch sending
      this.eventQueue.push(event);

      // Send immediately for critical events
      const criticalEvents = ['user_registered', 'user_login', 'prompt_generated', 'error_occurred'];
      if (criticalEvents.includes(eventType)) {
        await this.sendEvent(event);
      } else {
        // Batch send for performance
        this.debouncedFlush();
      }
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }

  async sendEvent(event) {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      await fetch(`${this.API_BASE}/api/analytics/track`, {
        method: 'POST',
        headers,
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  // Debounced flush to batch events
  debouncedFlush = this.debounce(() => {
    this.flushEvents();
  }, 2000);

  async flushEvents() {
    if (this.eventQueue.length === 0) return;

    const eventsToSend = [...this.eventQueue];
    this.eventQueue = [];

    for (const event of eventsToSend) {
      await this.sendEvent(event);
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Specific tracking methods for different user actions

  trackPageView(page, additionalData = {}) {
    this.trackEvent('page_view', {
      page,
      duration: Date.now() - this.startTime,
      ...additionalData
    });
    this.startTime = Date.now();
  }

  trackPromptGenerated(promptData) {
    this.trackEvent('prompt_generated', {
      input_length: promptData.input?.length || 0,
      output_length: promptData.output?.length || 0,
      response_time: promptData.responseTime || 0,
      success: promptData.success || false,
      algorithm_used: promptData.algorithm || 'unknown',
      detected_role: promptData.detected_role || 'unknown',
      persona: promptData.persona || 'unknown'
    });
  }

  trackFeatureUsed(feature, data = {}) {
    this.trackEvent('feature_used', {
      feature,
      ...data
    });
  }

  trackButtonClick(buttonName, location, additionalData = {}) {
    this.trackEvent('button_click', {
      button_name: buttonName,
      location,
      ...additionalData
    });
  }

  trackFormSubmission(formName, success, errors = []) {
    this.trackEvent('form_submission', {
      form_name: formName,
      success,
      errors,
      timestamp: new Date().toISOString()
    });
  }

  trackError(error, context = {}) {
    this.trackEvent('error_occurred', {
      error_message: error.message || error,
      error_stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    });
  }

  trackUserAction(action, target, data = {}) {
    this.trackEvent('user_action', {
      action,
      target,
      ...data
    });
  }

  trackPerformance(metric, value, context = {}) {
    this.trackEvent('performance_metric', {
      metric,
      value,
      context,
      timestamp: new Date().toISOString()
    });
  }

  // User engagement tracking
  trackEngagement(type, duration, data = {}) {
    this.trackEvent('user_engagement', {
      engagement_type: type,
      duration,
      ...data
    });
  }

  // Conversion tracking
  trackConversion(conversionType, value = null, data = {}) {
    this.trackEvent('conversion', {
      conversion_type: conversionType,
      value,
      ...data
    });
  }

  // Device and browser detection
  getBrowserInfo() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  getOSInfo() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'Tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'Mobile';
    return 'Desktop';
  }

  // Privacy controls
  enableTracking() {
    this.isEnabled = true;
    this.trackEvent('analytics_enabled', {});
  }

  disableTracking() {
    this.isEnabled = false;
    this.trackEvent('analytics_disabled', {});
  }

  // Get analytics dashboard data
  async getDashboardData() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await fetch(`${this.API_BASE}/api/analytics/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
    return null;
  }

  // Export user data (GDPR compliance)
  async exportUserData() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await fetch(`${this.API_BASE}/api/privacy/export-data`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to export user data:', error);
    }
    return null;
  }
}

// Create and export singleton instance
const analytics = new AnalyticsService();

// Global error tracking
window.addEventListener('error', (event) => {
  analytics.trackError(event.error, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

// Unhandled promise rejection tracking
window.addEventListener('unhandledrejection', (event) => {
  analytics.trackError(event.reason, {
    type: 'unhandled_promise_rejection'
  });
});

export default analytics;