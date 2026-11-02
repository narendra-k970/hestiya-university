'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  // State management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Status & Feedback states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      // Call POST /api/auth/login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid email or password.');
      }

      // Login success
      setSuccess('Login successful! Redirecting...');

      // Save user info in localStorage for client-side access
      if (typeof window !== 'undefined') {
        localStorage.setItem('hestiya_user', JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem('hestiya_token', data.token);
        }
      }

      // Redirect based on user role (Admin -> /admin, Learner -> /dashboard)
      setTimeout(() => {
        if (data.user?.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }, 1000);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to log in. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between py-4 px-4 sm:px-6 lg:px-8 font-sans selection:bg-primary selection:text-white">
      
      {/* Top back link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md pt-2">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Hestiya University
        </Link>
      </div>

      {/* Main Centered Box */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md my-auto py-4">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex justify-center text-2xl font-black tracking-tight items-center gap-2 mb-2">
            <Image src="/images/logo.png" alt="Hestiya Logo" width={36} height={36} className="w-9 h-9 object-contain drop-shadow-sm" priority />
            <span className="text-gray-900">
              Hestiya<span className="text-emerald-700 font-medium">University</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Sign in to your account
          </h2>
        </div>

        {/* Login Card */}
        <div className="bg-white py-6 px-6 sm:px-8 shadow-lg shadow-gray-200/50 sm:rounded-2xl border border-gray-100">
          
          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs sm:text-sm animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 flex items-start gap-2.5 text-green-700 text-xs sm:text-sm animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                className="appearance-none block w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder:font-normal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm font-semibold text-gray-950 bg-white transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className="appearance-none block w-full px-3.5 py-2.5 pr-11 border border-gray-300 rounded-lg shadow-sm placeholder:font-normal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm font-semibold text-gray-950 bg-white transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center cursor-pointer text-gray-700">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer mr-1.5"
                />
                Remember me
              </label>

              <Link href="/forgot-password" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                Forgot password?
              </Link>
            </div>

            <div className="pt-1">
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg shadow-md shadow-primary/20 text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>

            <div className="text-center pt-3 border-t border-gray-100 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-bold text-primary hover:text-primary-dark hover:underline transition-colors">
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Docked Footer at bottom of screen */}
      <footer className="w-full text-center text-xs text-gray-400 py-2.5 border-t border-gray-200/50 mt-auto">
        <p className="m-0 leading-none">© {new Date().getFullYear()} Hestiya University. All rights reserved.</p>
      </footer>
    </div>
  );
}
