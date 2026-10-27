'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  ChevronDown,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface AuthUser {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  role?: string;
  createdAt?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Load user data from localStorage on mount & listen for realtime updates
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem('hestiya_user');
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to parse user data from localStorage', e);
      }
    };

    loadUser();
    window.addEventListener('user-profile-updated', loadUser);
    return () => {
      window.removeEventListener('user-profile-updated', loadUser);
    };
  }, []);

  // Close profile popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hestiya_user');
      localStorage.removeItem('hestiya_token');
    }
    router.push('/login');
  };

  // User display helpers
  const displayName = user?.name || 'Learner';
  const firstName = displayName.trim().split(' ')[0];
  const displayEmail = user?.email || 'learner@hestiya.com';
  const displayRole = user?.role === 'ADMIN' ? 'Administrator' : 'Student / Learner';
  const initials = displayName
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'U';

  const memberSince = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Oct 2026';

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans selection:bg-primary selection:text-white">
      
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-xs animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar (Responsive Drawer) */}
      <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-40 shadow-md lg:shadow-sm transition-transform duration-300 lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo & Close Button */}
        <div className="h-18 lg:h-20 flex items-center justify-between px-4 sm:px-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
            <Image src="/images/logo.png" alt="Hestiya Logo" width={30} height={30} className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0" priority />
            <span className="text-base sm:text-lg font-black tracking-tight text-gray-900 whitespace-nowrap">
              Hestiya <span className="text-primary font-bold">University</span>
            </span>
          </Link>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 shrink-0"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-2">
            <Link 
              href="/dashboard" 
              onClick={() => setIsMobileOpen(false)}
              className={`group flex items-center justify-between px-3.5 py-3 text-sm rounded-xl transition-all ${
                pathname === '/dashboard' 
                  ? 'bg-emerald-50 text-emerald-900 font-extrabold border-l-4 border-emerald-600 shadow-2xs' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-semibold'
              }`}
            >
              <div className="flex items-center min-w-0">
                <LayoutDashboard className={`mr-3 flex-shrink-0 h-5 w-5 ${pathname === '/dashboard' ? 'text-emerald-700 stroke-[2.5]' : 'text-gray-400 group-hover:text-primary'}`} />
                <span>Overview</span>
              </div>
              {pathname === '/dashboard' && (
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 ml-2" />
              )}
            </Link>
            <Link 
              href="/university" 
              onClick={() => setIsMobileOpen(false)}
              className={`group flex items-center justify-between px-3.5 py-3 text-sm rounded-xl transition-all ${
                pathname?.startsWith('/dashboard/courses') || pathname?.startsWith('/university')
                  ? 'bg-emerald-50 text-emerald-900 font-extrabold border-l-4 border-emerald-600 shadow-2xs' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-semibold'
              }`}
            >
              <div className="flex items-center min-w-0">
                <BookOpen className={`mr-3 flex-shrink-0 h-5 w-5 ${pathname?.startsWith('/university') ? 'text-emerald-700 stroke-[2.5]' : 'text-gray-400 group-hover:text-primary'}`} />
                <span>Courses</span>
              </div>
              {(pathname?.startsWith('/dashboard/courses') || pathname?.startsWith('/university')) && (
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 ml-2" />
              )}
            </Link>
            <Link 
              href="/dashboard/certificates" 
              onClick={() => setIsMobileOpen(false)}
              className={`group flex items-center justify-between px-3.5 py-3 text-sm rounded-xl transition-all ${
                pathname?.startsWith('/dashboard/certificates')
                  ? 'bg-emerald-50 text-emerald-900 font-extrabold border-l-4 border-emerald-600 shadow-2xs' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-semibold'
              }`}
            >
              <div className="flex items-center min-w-0">
                <Award className={`mr-3 flex-shrink-0 h-5 w-5 ${pathname?.startsWith('/dashboard/certificates') ? 'text-emerald-700 stroke-[2.5]' : 'text-gray-400 group-hover:text-primary'}`} />
                <span>Certificates</span>
              </div>
              {pathname?.startsWith('/dashboard/certificates') && (
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 ml-2" />
              )}
            </Link>
          </nav>
        </div>
        
        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 space-y-1">
          <Link 
            href="/dashboard/settings" 
            onClick={() => setIsMobileOpen(false)}
            className={`group flex items-center justify-between px-3.5 py-3 text-sm rounded-xl transition-all ${
              pathname?.startsWith('/dashboard/settings')
                ? 'bg-emerald-50 text-emerald-900 font-extrabold border-l-4 border-emerald-600 shadow-2xs' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-semibold'
            }`}
          >
            <div className="flex items-center min-w-0">
              <Settings className={`mr-3 flex-shrink-0 h-5 w-5 ${pathname?.startsWith('/dashboard/settings') ? 'text-emerald-700 stroke-[2.5]' : 'text-gray-400 group-hover:text-gray-900'}`} />
              <span>Settings</span>
            </div>
            {pathname?.startsWith('/dashboard/settings') && (
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 ml-2" />
            )}
          </Link>
          <button 
            type="button"
            onClick={handleSignOut}
            className="w-full text-left text-red-600 hover:bg-red-50 group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="text-red-400 group-hover:text-red-600 mr-3 flex-shrink-0 h-5 w-5 transition-colors" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full">
        
        {/* Top Header */}
        <header className="h-18 lg:h-20 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:text-gray-900 lg:hidden rounded-lg hover:bg-gray-100"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              Learner Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <button className="text-gray-400 hover:text-primary transition-colors relative p-1.5 rounded-lg hover:bg-gray-50">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              {/* Notification Dot */}
              <span className="absolute top-1 right-1 block h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            
            {/* Real User Profile Pill & Click Popup */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 sm:gap-3 pl-3 sm:pl-5 border-l border-gray-200 cursor-pointer group focus:outline-none"
                aria-expanded={isProfileOpen}
                aria-label="User Profile Menu"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center ring-2 ring-transparent group-hover:ring-primary/30 transition-all text-xs sm:text-sm shadow-sm">
                  {initials}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                    {firstName}
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {displayRole}
                  </p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 hidden sm:block ${isProfileOpen ? 'rotate-180 text-primary' : 'group-hover:text-gray-600'}`} />
              </button>

              {/* Profile Popup Card */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150 font-sans">
                  
                  {/* Popup User Header */}
                  <div className="flex items-center gap-3.5 pb-3.5 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-primary text-white font-extrabold flex items-center justify-center text-base shadow-md shadow-primary/20 shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-extrabold text-gray-900 truncate">
                          {displayName}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {displayEmail}
                      </p>
                      <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        {user?.role || 'LEARNER'}
                      </span>
                    </div>
                  </div>

                  {/* Profile Details List */}
                  <div className="py-3 space-y-2.5 text-xs text-gray-600 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-gray-400">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </span>
                      <span className="font-semibold text-gray-800 truncate max-w-[150px]">
                        {displayEmail}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-gray-400">
                        <Phone className="w-3.5 h-3.5" /> Phone
                      </span>
                      <span className="font-semibold text-gray-800">
                        {user?.phone || 'Not provided'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-3.5 h-3.5" /> Joined
                      </span>
                      <span className="font-semibold text-gray-800">
                        {memberSince}
                      </span>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="pt-3 pb-2 space-y-1">
                    <Link
                      href="/dashboard/courses"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                        My Enrolled Courses
                      </span>
                      <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">View</span>
                    </Link>

                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Settings className="w-3.5 h-3.5 text-gray-400" />
                        Account Settings
                      </span>
                    </Link>
                  </div>

                  {/* Popup Sign Out Button */}
                  <div className="pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      Sign Out
                    </button>
                  </div>

                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content (Injected here) */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
        
      </main>
    </div>
  );
}
