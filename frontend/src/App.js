import React, { useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API}/profile`);
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
    setLoading(false);
  };

// Chrome Extension Page
const ChromeExtension = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              PromptPilot
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> Chrome Extension</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Transform any text input on the web into professional prompts. Works with ChatGPT, Claude, Gemini, and any AI platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 text-base">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Add to Chrome (Free)
              </button>
              <button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 text-base"
                onClick={() => window.location.hash = "#generate"}
              >
                Try Web Version
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* User Personas Section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              IS PROMPTPILOT A GOOD FIT FOR YOU?
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              For Founders, Creators & Growth-Driven Pros
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              AI is only as good as the prompts you give it. Whether you're creating content, analyzing data, or 
              experimenting with AI tools, PromptPilot helps you get the best results—faster.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Entrepreneurs & Business Owners */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Entrepreneurs & Business Owners</h3>
              <div className="text-primary font-medium mb-4">AI-Powered Growth</div>
              <p className="text-muted-foreground">
                Leverage AI for smarter decision-making, marketing, and customer engagement.
              </p>
            </div>

            {/* SaaS Creators & Tech Innovators */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">SaaS Creators & Tech Innovators</h3>
              <div className="text-primary font-medium mb-4">Smarter AI Workflows</div>
              <p className="text-muted-foreground">
                Enhance your AI-powered products and workflows with better prompts.
              </p>
            </div>

            {/* Content Creators & Marketers */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 text-white">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Content Creators & Marketers</h3>
              <div className="text-primary font-medium mb-4">Effortless Content</div>
              <p className="text-muted-foreground">
                Generate high-converting copy, social posts, and marketing strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Extension Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Seamlessly integrate PromptPilot into your daily AI workflow
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">One-Click Enhancement</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Right-click any text input and instantly transform it into a professional prompt
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Smart Detection</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Automatically detects the context and optimizes prompts for the specific AI platform
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Privacy First</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                All processing happens locally. Your data never leaves your browser
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Universal Compatibility</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Works with ChatGPT, Claude, Gemini, Perplexity, and any text input field
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Prompt Library</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Access your saved prompts and templates directly from the extension
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Customizable Settings</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Adjust prompt styles, role preferences, and output formats to match your needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Easy Installation
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get started in less than 30 seconds
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold">Add to Chrome</h3>
                <p className="text-muted-foreground">Click the "Add to Chrome" button above and confirm the installation</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold">Pin the Extension</h3>
                <p className="text-muted-foreground">Pin PromptPilot to your Chrome toolbar for easy access</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold">Start Enhancing</h3>
                <p className="text-muted-foreground">Right-click any text input or use the toolbar icon to transform your prompts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Supercharge Your AI Interactions?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of professionals using PromptPilot Chrome Extension
          </p>
          <div className="mt-8">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 text-base">
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Install Chrome Extension
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Footer Component


  const login = async (email, password) => {
    const response = await axios.post(`${API}/login`, { email, password });
    const { user, access_token } = response.data;
    localStorage.setItem("token", access_token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    setUser(user);
    return user;
  };

  const register = async (username, email, password) => {
    const response = await axios.post(`${API}/register`, { username, email, password });
    const { user, access_token } = response.data;
    localStorage.setItem("token", access_token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Header Component
const Header = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Force dark mode
    document.documentElement.className = "dark";
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>
          <button 
            onClick={() => window.location.hash = "#home"}
            className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent hover:from-primary hover:to-primary/80 transition-all duration-300"
          >
            PromptPilot
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          <button 
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" 
            onClick={() => window.location.hash = "#home"}
          >
            Home
          </button>
          <button 
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" 
            onClick={() => window.location.hash = "#generate"}
          >
            Generate
          </button>
          {user && (
            <button 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" 
              onClick={() => window.location.hash = "#history"}
            >
              History
            </button>
          )}
          <button 
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" 
            onClick={() => window.location.hash = "#extension"}
          >
            Extension
          </button>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Chrome Extension Button */}
          <button className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Get Extension
          </button>
          

          
          {/* User Menu or Auth Buttons */}
          {user ? (
            <div className="relative">
              <button 
                className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-sm font-medium">{user.username}</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                  <button 
                    className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => {
                      window.location.hash = "#profile";
                      setShowDropdown(false);
                    }}
                  >
                    Profile
                  </button>
                  <button 
                    className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button 
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-primary/20 bg-background/50 text-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary h-10 px-6 py-2 backdrop-blur-sm" 
                onClick={() => window.location.hash = "#login"}
              >
                Login
              </button>
              <button 
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 hover:shadow-lg hover:shadow-primary/25 h-10 px-6 py-2" 
                onClick={() => window.location.hash = "#register"}
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <div className="mx-auto mb-8 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <span className="mr-2">✨</span>
              WORKS WITH ALL AI PLATFORMS
            </div>
            <h1 className="mx-auto max-w-5xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Transform Ideas into
              <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent"> Powerful Prompts</span>
              <br />Instantly
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-muted-foreground">
              PromptPilot uses advanced AI algorithms to convert your rough ideas into structured, 
              professional prompts that deliver exceptional results across all AI platforms. 
              Stop struggling with prompt engineering.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button 
                className="inline-flex items-center justify-center rounded-xl text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 hover:shadow-xl hover:shadow-primary/25 h-14 px-10 py-4"
                onClick={() => window.location.hash = "#generate"}
              >
                Start Creating Prompts
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                className="inline-flex items-center justify-center rounded-xl text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-primary/20 bg-background/50 text-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary h-14 px-10 py-4 backdrop-blur-sm"
                onClick={() => window.location.hash = "#extension"}
              >
                Get Chrome Extension
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Platform Compatibility Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              UNIVERSAL AI COMPATIBILITY
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Works with all major AI platforms
              <br />and web browsers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              PromptPilot seamlessly integrates with your favorite AI tools and works across all modern browsers
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
            {/* ChatGPT */}
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-background/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">C</span>
              </div>
              <span className="text-sm font-medium text-foreground">ChatGPT</span>
            </div>
            
            {/* Claude */}
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-background/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">Cl</span>
              </div>
              <span className="text-sm font-medium text-foreground">Claude</span>
            </div>
            
            {/* Gemini */}
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-background/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">G</span>
              </div>
              <span className="text-sm font-medium text-foreground">Gemini</span>
            </div>
            
            {/* Mistral */}
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-background/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">M</span>
              </div>
              <span className="text-sm font-medium text-foreground">Mistral</span>
            </div>
            
            {/* DeepSeek */}
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-background/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">D</span>
              </div>
              <span className="text-sm font-medium text-foreground">DeepSeek</span>
            </div>
            
            {/* More */}
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-background/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-sm font-medium text-foreground">& More</span>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Compatible with Chrome, Firefox, Safari, Edge and all modern browsers
            </p>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Why PromptPilot?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your AI interactions with intelligent prompt optimization
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Smart Algorithm */}
            <div className="rounded-xl border bg-card p-8 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart AI Algorithm</h3>
              <p className="text-muted-foreground">
                Advanced algorithms analyze your input and automatically structure it into effective prompts that get better AI responses.
              </p>
            </div>
            
            {/* Role Detection */}
            <div className="rounded-xl border bg-card p-8 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Context-Aware Processing</h3>
              <p className="text-muted-foreground">
                Automatically detects the context and purpose of your request to create role-specific prompts tailored to your needs.
              </p>
            </div>
            
            {/* Universal Compatibility */}
            <div className="rounded-xl border bg-card p-8 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Universal Compatibility</h3>
              <p className="text-muted-foreground">
                Works seamlessly with all major AI platforms and integrates directly into your browser for instant access.
              </p>
            </div>
            
            {/* Instant Results */}
            <div className="rounded-xl border bg-card p-8 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Optimization</h3>
              <p className="text-muted-foreground">
                Get professionally structured prompts in seconds. No more trial and error or prompt engineering knowledge required.
              </p>
            </div>
            
            {/* Privacy Focused */}
            <div className="rounded-xl border bg-card p-8 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
              <p className="text-muted-foreground">
                Your data stays secure. All processing happens locally in your browser with no data sent to external servers.
              </p>
            </div>
            
            {/* Save & Organize */}
            <div className="rounded-xl border bg-card p-8 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Save & Organize</h3>
              <p className="text-muted-foreground">
                Build your personal library of optimized prompts. Save, categorize, and reuse your best prompts across projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose PromptPilot?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional-grade prompt engineering made simple and accessible
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Smart Role Detection</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Automatically identifies your role and context to create persona-aware prompts with high accuracy
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Offline Algorithm</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Advanced offline engine that works without API dependencies, ensuring privacy and reliability
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Master Prompts</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Generates comprehensive, structured prompts optimized for maximum LLM performance
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">History & Export</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Save, organize, and export your prompts in multiple formats for easy sharing and reuse
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithm Section */}
      <section className="py-24 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 dark:from-orange-950/10 dark:via-yellow-950/10 dark:to-pink-950/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce delay-1000" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              ADVANCED AI ALGORITHMS
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Powered by Cutting-Edge Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our proprietary algorithms will be revealed soon. Stay tuned for revolutionary prompt optimization technology.
            </p>
          </div>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Algorithm Placeholder */}
            <div className="space-y-8">
              {/* Placeholder 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-bold">
                  ?
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Algorithm Details Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're developing revolutionary AI algorithms that will transform how you create prompts. More details will be announced soon.
                  </p>
                </div>
              </div>

              {/* Placeholder 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-bold">
                  ?
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Advanced Processing Engine</h3>
                  <p className="text-muted-foreground">
                    Our next-generation processing engine will provide unprecedented prompt optimization capabilities. Stay tuned for updates.
                  </p>
                </div>
              </div>

              {/* Placeholder 3 */}
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold">
                  ?
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Smart Optimization Technology</h3>
                  <p className="text-muted-foreground">
                    Revolutionary technology that will automatically enhance your prompts for maximum effectiveness across all AI platforms.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Chrome Extension Showcase */}
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 border border-primary/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Chrome Extension for Seamless Access
                  </h3>
                  <p className="text-muted-foreground">
                    Transform any text input on the web into professional prompts. Works with ChatGPT, Claude, Gemini, and any AI platform.
                  </p>
                </div>
                
                {/* Mock Extension Interface */}
                <div className="bg-background rounded-xl border shadow-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1 bg-muted rounded px-3 py-1 text-xs text-muted-foreground text-center">
                      PromptPilot: Grammarly but for prompts
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                        <span className="text-xs text-primary">✨</span>
                      </div>
                      <span className="text-sm text-foreground">Works with all AI tools</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                        <span className="text-xs text-primary">🔒</span>
                      </div>
                      <span className="text-sm text-foreground">100% Privacy Protected</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                        <span className="text-xs text-primary">⚡</span>
                      </div>
                      <span className="text-sm text-foreground">One-click enhancement</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
                    Add to Chrome - Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by Professionals
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what our users are saying about PromptPilot
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                "PromptPilot has revolutionized how I create prompts for my AI projects. The role detection is incredibly accurate."
              </p>
              <div className="mt-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">SJ</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">AI Researcher</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                "The offline capability is a game-changer. I can create professional prompts anywhere without worrying about API costs."
              </p>
              <div className="mt-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">MC</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Mike Chen</p>
                  <p className="text-xs text-muted-foreground">Software Developer</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                "PromptPilot saves me hours every week. The structured prompts consistently deliver better results from ChatGPT."
              </p>
              <div className="mt-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">ER</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Emily Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Content Creator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/10 dark:via-teal-950/10 dark:to-cyan-950/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-1000" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that works best for you
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="rounded-2xl border bg-card p-8 text-card-foreground shadow-sm">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">Free Plan</h3>
                <p className="text-muted-foreground mb-4">Perfect for getting started</p>
                <div className="text-4xl font-bold text-foreground mb-2">$0</div>
                <p className="text-sm text-muted-foreground">Forever free</p>
              </div>
              
              <button className="w-full bg-muted text-foreground hover:bg-muted/80 rounded-xl py-3 font-medium transition-colors mb-6">
                Get Started Free
              </button>
              
              <p className="text-center text-sm text-muted-foreground">
                No credit card required
              </p>
            </div>

            {/* Pro Plan */}
            <div className="rounded-2xl border-2 border-primary bg-card p-8 text-card-foreground shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  MOST POPULAR
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">Pro Plan</h3>
                <p className="text-muted-foreground mb-4">For power users and professionals</p>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-4xl font-bold text-foreground">Coming Soon</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Pricing will be announced soon</p>
              </div>
              
              <button className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 rounded-xl py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 mb-6">
                Join Waitlist
              </button>
              
              <p className="text-center text-sm text-muted-foreground">
                Be the first to know when Pro launches
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary px-6 py-16 text-center sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to Transform Your Prompts?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Join thousands of professionals who trust PromptPilot for their AI interactions
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground hover:bg-background/90 h-11 px-8 text-base"
                onClick={() => window.location.hash = "#generate"}
              >
                Start Free Today
              </button>
              <button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 h-11 px-8 text-base"
                onClick={() => window.location.hash = "#extension"}
              >
                Download Extension
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Login Component
const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      window.location.hash = "#generate";
    } catch (error) {
      setError(error.response?.data?.detail || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg mx-auto mb-6">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your PromptPilot account</p>
        </div>
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button 
                onClick={() => window.location.hash = "#register"}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Register Component
const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(formData.username, formData.email, formData.password);
      window.location.hash = "#generate";
    } catch (error) {
      setError(error.response?.data?.detail || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg mx-auto mb-6">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Create Account</h2>
          <p className="mt-2 text-sm text-muted-foreground">Join PromptPilot and start creating amazing prompts</p>
        </div>
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button 
                onClick={() => window.location.hash = "#login"}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Generate Component
const Generate = () => {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMode, setSelectedMode] = useState("sniper");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [includeRAG, setIncludeRAG] = useState(true);
  const [validationLevel, setValidationLevel] = useState("standard");

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post(`${API}/prompts/generate`, {
        user_input: input,
        mode: selectedMode,
        include_rag: includeRAG,
        validation_level: validationLevel,
        include_examples: true,
        include_clarifications: true
      });
      setOutput(response.data);
    } catch (error) {
      setError(error.response?.data?.detail || "Failed to generate prompt");
    }
    setLoading(false);
  };

  const copyToClipboard = async (promptType = 'professional') => {
    const promptText = promptType === 'quick' ? output?.quick_prompt : output?.professional_prompt;
    if (!promptText) return;
    
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(promptText);
        alert('Prompt copied to clipboard!');
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = promptText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          alert('Prompt copied to clipboard!');
        } catch (err) {
          console.error('Fallback copy failed:', err);
          // Show the text in a modal for manual copying
          alert('Copy failed. Text will be selected for manual copying.');
          textArea.style.position = 'static';
          textArea.style.left = 'auto';
          textArea.style.top = 'auto';
          textArea.select();
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
      // Provide user-friendly error handling
      const shouldShowText = window.confirm('Clipboard access denied. Would you like to see the text in a new window for manual copying?');
      if (shouldShowText) {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`<html><body><h3>Generated Prompt (Copy manually):</h3><pre>${output.generated_output}</pre></body></html>`);
      }
    }
  };

  const exportPrompt = (format, promptType = 'professional') => {
    const promptText = promptType === 'quick' ? output?.quick_prompt : output?.professional_prompt;
    if (!promptText) return;
    
    try {
      const content = promptText;
      const blob = new Blob([content], { 
        type: format === 'md' ? 'text/markdown' : 'text/plain' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prompt-${Date.now()}.${format}`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Show success message
      setTimeout(() => {
        alert(`Prompt exported as ${format.toUpperCase()} file successfully!`);
      }, 100);
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed. Error: ${error.message}`);
    }
  };

  if (!user) {
    return (
      <div className="page">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please log in to use the prompt generator.</p>
          <button className="btn-primary" onClick={() => window.location.hash = "#login"}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="generate-container">
          <h2 className="page-title">Generate Master Prompt</h2>
          
          <div className="input-section">
            <div className="form-group">
              <label>Describe your vague idea or request:</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., I want to build an app that helps people learn coding..."
                className="form-textarea"
                rows={4}
              />
            </div>
            
            {/* Mode Selection */}
            <div className="mode-selection">
              <label>Generation Mode:</label>
              <div className="mode-options">
                <label className="mode-option">
                  <input
                    type="radio"
                    value="sniper"
                    checked={selectedMode === "sniper"}
                    onChange={(e) => setSelectedMode(e.target.value)}
                  />
                  <span className="mode-label">
                    <strong>🎯 Sniper Mode</strong>
                    <small>Fast, precise, minimal prompts for immediate results</small>
                  </span>
                </label>
                <label className="mode-option">
                  <input
                    type="radio"
                    value="titan"
                    checked={selectedMode === "titan"}
                    onChange={(e) => setSelectedMode(e.target.value)}
                  />
                  <span className="mode-label">
                    <strong>🏛️ Titan Mode</strong>
                    <small>Comprehensive, structured prompts with detailed sections</small>
                  </span>
                </label>
              </div>
            </div>
            
            {/* Advanced Options */}
            <div className="advanced-options">
              <button 
                type="button"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="btn-link"
              >
                {showAdvancedOptions ? '▼' : '▶'} Advanced Options
              </button>
              
              {showAdvancedOptions && (
                <div className="advanced-controls">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={includeRAG}
                      onChange={(e) => setIncludeRAG(e.target.checked)}
                    />
                    <span>Include knowledge enhancement (RAG)</span>
                  </label>
                  
                  <div className="form-group">
                    <label>Validation Level:</label>
                    <select 
                      value={validationLevel} 
                      onChange={(e) => setValidationLevel(e.target.value)}
                      className="form-select"
                    >
                      <option value="minimal">Minimal</option>
                      <option value="standard">Standard</option>
                      <option value="strict">Strict</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="btn-primary"
            >
              {loading ? "Generating..." : "Generate Advanced Prompts"}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {output && (
            <div className="output-section">
              
              {/* Single Prompt Display */}
              <div className="prompt-container">
                {((selectedMode === 'sniper' && output.quick_prompt) || (selectedMode === 'titan' && output.professional_prompt)) && (
                  <div className="prompt-card">
                    <div className="prompt-header">
                      <h3>{selectedMode === 'sniper' ? '🎯 Sniper Mode' : '🏛️ Titan Mode'}</h3>
                      <div className="prompt-actions">
                        <button onClick={() => copyToClipboard(selectedMode === 'sniper' ? 'quick' : 'professional')} className="btn-secondary">
                          📋 Copy
                        </button>
                        <button onClick={() => exportPrompt('txt', selectedMode === 'sniper' ? 'quick' : 'professional')} className="btn-secondary">
                          📄 Export
                        </button>
                      </div>
                    </div>
                    <div className="prompt-content">
                      <pre>{selectedMode === 'sniper' ? output.quick_prompt : output.professional_prompt}</pre>
                    </div>
                    <div className="prompt-stats">
                      <span>Length: {(selectedMode === 'sniper' ? output.quick_prompt : output.professional_prompt).length} chars</span>
                      <span>Words: {(selectedMode === 'sniper' ? output.quick_prompt : output.professional_prompt).split(' ').length}</span>
                    </div>
                  </div>
                )}
              </div>
              

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// History Component
const History = () => {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API}/prompts`);
      setPrompts(response.data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
    setLoading(false);
  };

  const deletePrompt = async (id) => {
    try {
      await axios.delete(`${API}/prompts/${id}`);
      setPrompts(prompts.filter(p => p.id !== id));
    } catch (error) {
      console.error("Failed to delete prompt:", error);
    }
  };

  if (!user) {
    return (
      <div className="page">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please log in to view your prompt history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h2 className="page-title">Prompt History</h2>
        
        {loading ? (
          <div className="loading">Loading history...</div>
        ) : prompts.length === 0 ? (
          <div className="empty-state">
            <p>No prompts generated yet.</p>
            <button 
              className="btn-primary" 
              onClick={() => window.location.hash = "#generate"}
            >
              Generate Your First Prompt
            </button>
          </div>
        ) : (
          <div className="history-grid">
            <div className="history-list">
              {prompts.map((prompt) => (
                <div 
                  key={prompt.id} 
                  className={`history-item ${selectedPrompt?.id === prompt.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPrompt(prompt)}
                >
                  <div className="history-item-header">
                    <h3>{prompt.raw_input.substring(0, 50)}...</h3>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePrompt(prompt.id);
                      }}
                      className="delete-btn"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="history-item-meta">
                    <span>{prompt.detected_role.replace(/_/g, ' ')}</span>
                    <span>{new Date(prompt.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedPrompt && (
              <div className="history-detail">
                <div className="detail-header">
                  <h3>Generated Prompt</h3>
                  <div className="detail-meta">
                    <span>Role: {selectedPrompt.detected_role.replace(/_/g, ' ')}</span>
                    <span>Source: {selectedPrompt.source}</span>
                  </div>
                </div>
                <div className="detail-content">
                  <h4>Original Input:</h4>
                  <p>{selectedPrompt.raw_input}</p>
                  
                  <h4>Generated Output:</h4>
                  <pre>{selectedPrompt.generated_output}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Profile Component  
const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    theme: "dark"
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username || "",
        email: user.email || "",
        theme: user.theme || "dark"
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.put(`${API}/profile`, profile);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Failed to update profile");
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="page">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="profile-container">
          <h2 className="page-title">Profile Settings</h2>
          
          <form onSubmit={handleUpdate} className="profile-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Theme</label>
              <select
                value={profile.theme}
                onChange={(e) => setProfile({ ...profile, theme: e.target.value })}
                className="form-select"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            
            {message && <div className="message">{message}</div>}
            
            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Updating..." : "Update Profile"}
              </button>
              <button type="button" onClick={logout} className="btn-secondary">
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground">PromptPilot</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Transform vague ideas into professional prompts with advanced AI algorithms.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-12.014C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#generate" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Prompt Generator</a></li>
              <li><a href="#extension" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Chrome Extension</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API Access</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Prompt Templates</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2025 PromptPilot. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 sm:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    // Force dark mode globally
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) || "home";
      setCurrentPage(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Initialize

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      case "generate":
        return <Generate />;
      case "history":
        return <History />;
      case "profile":
        return <Profile />;
      case "extension":
        return <ChromeExtension />;
      default:
        return <Home />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;