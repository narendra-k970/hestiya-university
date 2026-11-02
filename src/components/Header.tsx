'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Menu, 
  X,
  MessageSquare
} from 'lucide-react';
import AdvisorModal from '@/components/AdvisorModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);

  return (
    <>
      {/* Universal Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E2D7] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center gap-4 flex-nowrap">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap">
            <Image 
              src="/images/logo.png" 
              alt="Hestiya Logo" 
              width={36} 
              height={36} 
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm transition-transform group-hover:scale-105" 
              priority 
            />
            <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-950 whitespace-nowrap font-serif">
              Hestiya<span className="text-emerald-700 font-semibold font-serif">University</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-stone-700 flex-nowrap shrink-0">
            <Link href="/courses" className="whitespace-nowrap hover:text-emerald-700 transition-colors">
              Courses
            </Link>
            <Link href="/#about" className="whitespace-nowrap hover:text-emerald-700 transition-colors">
              About
            </Link>
            <button 
              type="button"
              onClick={() => setIsAdvisorModalOpen(true)}
              className="whitespace-nowrap hover:text-emerald-700 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Talk to an Education Advisor</span>
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0 flex-nowrap">
            <Link 
              href="/login" 
              className="whitespace-nowrap text-sm font-semibold text-stone-800 hover:text-emerald-700 px-3 py-2 transition-colors cursor-pointer"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="whitespace-nowrap text-sm font-bold bg-[#F59E0B] hover:bg-[#D97706] text-stone-950 px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all transform active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-800 hover:bg-stone-200/50 shrink-0 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#E7E2D7] bg-[#FAF8F5] px-6 py-4 space-y-3">
            <Link 
              href="/courses" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-700"
            >
              Courses
            </Link>
            <Link 
              href="/#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-700"
            >
              About
            </Link>
            <button 
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdvisorModalOpen(true);
              }}
              className="block w-full text-left py-2 text-sm font-semibold text-stone-800 hover:text-emerald-700 cursor-pointer"
            >
              Talk to an Education Advisor
            </button>
            <div className="pt-3 border-t border-[#E7E2D7] flex flex-col gap-2">
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-stone-800 bg-white border border-[#DDD6C8] rounded-xl cursor-pointer"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-bold bg-[#F59E0B] text-stone-950 rounded-xl cursor-pointer"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Unified Education Advisor Modal */}
      <AdvisorModal 
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        title="Talk to an Education Advisor"
        subtitle="Connect with our faculty to discuss course curriculum, enterprise training, or certificate pathways."
      />
    </>
  );
}