'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  BookOpen, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

const availableCourses = [
  {
    slug: 'esg-basics-supply-chains',
    title: 'ESG Basics for Fashion & Manufacturing Supply Chains',
    tag: 'Flagship Program',
    duration: '4.5 – 6 Hours',
    badge: 'border-emerald-500 bg-emerald-50/70 text-emerald-950',
    accent: 'text-emerald-700',
    border: 'border-emerald-600 ring-2 ring-emerald-500/30 bg-emerald-50/40',
  },
  {
    slug: 'carbon-markets-irec-fundamentals',
    title: 'Carbon Markets & I-RECs Fundamentals',
    tag: 'Specialized Track',
    duration: '5 – 6.5 Hours',
    badge: 'border-amber-500 bg-amber-50/70 text-amber-950',
    accent: 'text-amber-700',
    border: 'border-amber-600 ring-2 ring-amber-500/30 bg-amber-50/40',
  },
];

function RegisterContent() {
  const searchParams = useSearchParams();

  // Read course param from URL if present
  const initialCourseParam = searchParams.get('course') || '';
  const defaultSlug = initialCourseParam.toLowerCase().includes('carbon')
    ? 'carbon-markets-irec-fundamentals'
    : 'esg-basics-supply-chains';

  // State management: Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    courseSlug: defaultSlug,
    password: '',
    confirmPassword: '',
    terms: true,
  });

  // UI state: Show/Hide password, Loading, Error & Success state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredSuccess, setRegisteredSuccess] = useState<{
    userName: string;
    email: string;
    courseTitle: string;
    courseSlug: string;
  } | null>(null);

  // Sync if URL param changes
  useEffect(() => {
    if (initialCourseParam) {
      const match = initialCourseParam.toLowerCase().includes('carbon')
        ? 'carbon-markets-irec-fundamentals'
        : 'esg-basics-supply-chains';
      setFormData((prev) => ({ ...prev, courseSlug: match }));
    }
  }, [initialCourseParam]);

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (error) setError(null);
  };

  // Form submit handler - Calls POST /api/auth/signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic frontend checks
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError('Please fill in your name, email, and password.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify and re-type.');
      return;
    }

    if (!formData.terms) {
      setError('Please accept the Terms of Service to continue.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          courseSlug: formData.courseSlug,
          password: formData.password,
          role: 'LEARNER',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create student account.');
      }

      // Save user session in localStorage for client state persistence
      if (data.user) {
        localStorage.setItem('hestiya_user', JSON.stringify(data.user));
      }

      const activeTrack = availableCourses.find((c) => c.slug === formData.courseSlug);

      setRegisteredSuccess({
        userName: data.user?.name || formData.name,
        email: data.user?.email || formData.email,
        courseTitle: activeTrack?.title || 'ESG Basics for Fashion & Manufacturing Supply Chains',
        courseSlug: formData.courseSlug,
      });

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#15803d] selection:text-white">
      
      {/* Top back link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl pt-2">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Hestiya University Home
        </Link>
      </div>

      {/* Main Centered Content */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl my-auto py-6">
        
        {/* Header Branding */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex justify-center text-2xl font-black tracking-tight items-center gap-2 mb-2">
            <Image 
              src="/images/logo.png" 
              alt="Hestiya Logo" 
              width={38} 
              height={38} 
              className="w-9 h-9 object-contain drop-shadow-sm" 
              priority 
            />
            <span className="text-stone-900 font-serif">
              Hestiya<span className="text-emerald-700 font-semibold font-serif">University</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
            Student Registration & Enrollment
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-lg mx-auto">
            Fill in your details below to create your student portal login. You will use this email & password to access your curriculum, quizzes, and certificates anytime.
          </p>
        </div>

        {registeredSuccess ? (
          /* ==================================================================== */
          /* REGISTRATION SUCCESS VIEW                                            */
          /* ==================================================================== */
          <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-stone-200/50 sm:rounded-3xl border-2 border-emerald-300 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 block">
                Account & Enrollment Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 font-serif">
                Welcome, {registeredSuccess.userName}!
              </h2>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Your student profile is active. You are officially enrolled in: <br />
                <strong className="text-stone-950 font-bold">{registeredSuccess.courseTitle}</strong>
              </p>
            </div>

            <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-left text-xs text-emerald-950 space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-700" /> Your Login Credentials:
              </p>
              <div className="bg-white p-3 rounded-xl border border-emerald-200/80 font-mono text-xs space-y-1">
                <p><span className="text-stone-500">Student ID / Email:</span> <strong className="text-stone-900 font-bold">{registeredSuccess.email}</strong></p>
                <p><span className="text-stone-500">Password:</span> <span className="text-stone-700">•••••••• (The password you just set)</span></p>
              </div>
              <p className="text-[11px] text-emerald-800">
                Tip: You can now sign in directly at <Link href="/login" className="underline font-bold text-emerald-900">/login</Link> anytime using this email and password.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href={`/courses/${registeredSuccess.courseSlug}/lesson/1`}
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-900/10 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start First Lesson Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-sm font-bold transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Go to Student Dashboard
              </Link>
            </div>
          </div>
        ) : (
          /* ==================================================================== */
          /* REGISTRATION FORM                                                    */
          /* ==================================================================== */
          <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-stone-200/50 sm:rounded-3xl border border-stone-200">
            
            {/* Error Alert */}
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs sm:text-sm animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* Course Selection Dropdown */}
              <div>
                <label htmlFor="courseSlug" className="block text-xs font-semibold text-stone-700 mb-1">
                  Select Course Track <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="courseSlug"
                    name="courseSlug"
                    value={formData.courseSlug}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full pl-9 pr-10 py-2.5 border border-stone-300 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-sm font-medium text-stone-900 bg-white transition-all cursor-pointer"
                  >
                    <option value="esg-basics-supply-chains">
                      ESG Basics for Fashion & Manufacturing Supply Chains (4.5 – 6 Hours)
                    </option>
                    <option value="carbon-markets-irec-fundamentals">
                      Carbon Markets & I-RECs Fundamentals (5 – 6.5 Hours)
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 2. Personal Information: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name (for certificate) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl shadow-xs placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-sm font-medium text-stone-900 bg-white transition-all"
                      placeholder="e.g. Ananya Sharma"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address (Login ID) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl shadow-xs placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-sm font-medium text-stone-900 bg-white transition-all"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl shadow-xs placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-sm font-medium text-stone-900 bg-white transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-semibold text-stone-700 mb-1">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl shadow-xs placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-sm font-medium text-stone-900 bg-white transition-all"
                      placeholder="e.g. EcoTextiles Ltd / Self"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-xs font-semibold text-stone-700 mb-1">
                    Password (for Login) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-9 pr-10 py-2.5 border border-stone-300 rounded-xl shadow-xs placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-sm font-medium text-stone-900 bg-white transition-all"
                      placeholder="Min 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 focus:outline-none cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-stone-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-stone-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-semibold text-stone-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-9 pr-10 py-2.5 border border-stone-300 rounded-xl shadow-xs placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-sm font-medium text-stone-900 bg-white transition-all"
                      placeholder="Re-enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 focus:outline-none cursor-pointer"
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-stone-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-stone-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Reminder Callout */}
              <div className="p-3 bg-stone-50 border border-stone-200/80 rounded-xl text-xs text-stone-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Remember your email & password. You will use these exact credentials to log in at <Link href="/login" className="underline font-bold text-stone-900">/login</Link> whenever you return.
                </span>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start text-xs pt-1">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={formData.terms}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-700 focus:ring-emerald-600 border-stone-300 rounded cursor-pointer shrink-0 mt-0.5"
                />
                <label htmlFor="terms" className="ml-2 block text-stone-600 cursor-pointer">
                  I agree to the <a href="#" className="text-emerald-700 hover:underline font-semibold">Terms of Service</a> and confirm that my name is accurate for official verified certificate issuance.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl shadow-md shadow-emerald-950/10 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account & Enrolling...
                    </>
                  ) : (
                    'Create Student Account & Start Course'
                  )}
                </button>
              </div>

              {/* Link to Login */}
              <div className="text-center pt-3 border-t border-stone-100 text-sm text-stone-600">
                Already registered?{' '}
                <Link href="/login" className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline transition-colors">
                  Sign in with your Email & Password
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Docked Footer at bottom of screen */}
      <footer className="w-full text-center text-xs text-stone-400 py-3 border-t border-stone-200 mt-auto">
        <p className="m-0 leading-none">© {new Date().getFullYear()} Hestiya University. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}