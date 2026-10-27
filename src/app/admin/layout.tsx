'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Award, 
  FileCheck, 
  ExternalLink, 
  LogOut, 
  Bell, 
  Menu, 
  X 
} from 'lucide-react';

const navItems = [
  { 
    name: 'Overview', 
    href: '/admin', 
    icon: LayoutDashboard,
    exact: true 
  },
  { 
    name: 'Manage Courses', 
    href: '/admin/courses', 
    icon: BookOpen 
  },
  { 
    name: 'Manage Students', 
    href: '/admin/students', 
    icon: Users 
  },
  { 
    name: 'Assessments & Qs', 
    href: '/admin/assessments', 
    icon: FileCheck 
  },
  { 
    name: 'Certificates', 
    href: '/admin/certificates', 
    icon: Award 
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Active check helper
  const isItemActive = (href: string, exact = false) => {
    if (!pathname) return false;
    if (exact) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Current page title derived from active route
  const currentItem = navItems.find((item) => isItemActive(item.href, item.exact));
  const currentTitle = currentItem?.name || 'Admin Console';

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans selection:bg-primary selection:text-white">
      
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-xs animate-in fade-in duration-200"
        />
      )}

      {/* Admin Sidebar (Responsive Drawer) */}
      <aside className={`w-64 bg-slate-900 text-white flex flex-col fixed h-full z-40 shadow-xl border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Brand Header */}
        <div className="h-18 lg:h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <Link 
            href="/admin" 
            onClick={() => setIsMobileOpen(false)}
            className="text-xl font-black tracking-tight flex items-center gap-2.5"
          >
            <Image src="/images/logo.png" alt="Hestiya Logo" width={32} height={32} className="w-8 h-8 object-contain" priority />
            <div className="flex flex-col">
              <span className="leading-none font-extrabold text-white">Hestiya</span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Admin Console</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ADMIN
            </span>
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-6 px-3">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Management</p>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const active = isItemActive(item.href, item.exact);
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  onClick={() => setIsMobileOpen(false)}
                  className={`group flex items-center justify-between px-3.5 py-2.5 text-sm rounded-xl transition-all cursor-pointer ${
                    active
                      ? 'bg-emerald-600 text-white font-extrabold shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-400/40' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80 font-semibold'
                  }`}
                >
                  <div className="flex items-center min-w-0">
                    <Icon className={`mr-3 h-4 w-4 shrink-0 transition-colors ${
                      active ? 'text-white stroke-[2.5]' : 'text-slate-400 group-hover:text-emerald-400'
                    }`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-white shadow-xs shrink-0 ml-2 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* Quick Link & Sign Out */}
        <div className="p-4 border-t border-slate-800 space-y-1 text-xs">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink className="mr-2.5 h-4 w-4" />
            View Public Site
          </Link>
          <Link 
            href="/login" 
            className="flex items-center px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="mr-2.5 h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full min-w-0">
        
        {/* Admin Top Header */}
        <header className="h-16 sm:h-18 lg:h-20 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-6 lg:px-8 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-1.5 sm:p-2 -ml-1 text-gray-600 hover:text-gray-900 lg:hidden rounded-lg hover:bg-gray-100 shrink-0 cursor-pointer"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-semibold text-gray-400 hidden sm:inline">Admin /</span>
              <h1 className="text-base sm:text-lg lg:text-xl font-extrabold text-gray-900 truncate">
                {currentTitle}
              </h1>
            </div>
            <span className="hidden md:inline-block text-[11px] px-2.5 py-0.5 bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 rounded-full shrink-0">
              Active Console
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button className="text-gray-400 hover:text-gray-600 transition-colors relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 shrink-0 cursor-pointer">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>
            
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-gray-200 shrink-0">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                AD
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-gray-900 leading-tight">Admin Supervisor</p>
                <p className="text-[10px] text-gray-500 font-medium">Operations & Curriculum</p>
              </div>
            </div>
          </div>
        </header>

        {/* Injected Content */}
        <div className="p-3.5 sm:p-6 lg:p-8 flex-1 min-w-0">
          {children}
        </div>
        
      </main>
    </div>
  );
}
