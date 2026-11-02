'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Mail, 
  CheckCircle2, 
  Globe, 
  Lock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  dark?: boolean;
}

export default function Footer({ dark = false }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      className={`w-full transition-colors border-t font-sans ${
        dark
          ? 'border-white/10 bg-[#0B1512] text-gray-300'
          : 'border-[#E7E2D7] bg-[#FAF8F5] text-stone-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-14 lg:py-18">
        
        {/* Top Newsletter / Regulatory Briefing Callout */}
        <div className={`mb-14 p-8 sm:p-10 rounded-3xl border transition-all ${
          dark
            ? 'bg-white/5 border-white/10 text-white'
            : 'bg-white border-[#E5E0D8] text-stone-900 shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
        }`}>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-100 text-amber-900 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Executive Regulatory Briefing
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Stay ahead of Scope 3 mandates & EU sustainability directives.
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed max-w-xl ${
                dark ? 'text-gray-400' : 'text-stone-600'
              }`}>
                Join 4,200+ compliance directors and sustainability analysts receiving our bi-weekly breakdown of German LkSG audits, EU CSDDD enforcements, and carbon market shifts. Zero spam.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Thank you for subscribing! You will receive our next briefing.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your corporate email"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm border font-medium outline-none transition-all ${
                        dark
                          ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                          : 'bg-[#FAF8F5] border-[#DDD6C8] text-stone-900 placeholder-stone-400 focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-stone-950 font-bold text-sm rounded-xl transition-all shadow-sm transform active:scale-95 whitespace-nowrap cursor-pointer"
                  >
                    Subscribe Free
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Main 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#E7E2D7]">
          
          {/* Column 1: Organization & Identity (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Image 
                src="/images/logo.png" 
                alt="Hestiya Logo" 
                width={36} 
                height={36} 
                className="w-9 h-9 object-contain drop-shadow-sm transition-transform group-hover:scale-105" 
              />
              <span className={`text-2xl font-black tracking-tight ${dark ? 'text-white' : 'text-stone-950'}`}>
                Hestiya<span className="text-emerald-700 font-medium">University</span>
              </span>
            </Link>
            
            <p className={`text-sm leading-relaxed max-w-sm ${dark ? 'text-gray-400' : 'text-stone-600'}`}>
              Forensic, audit-ready sustainability education for global manufacturing and fashion supply chains. Master Scope 3 calculations, factory due diligence, and verifiable carbon credits.
            </p>

            {/* Live Operational Status Indicator */}
            <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span>2026 Admissions Open • Verifiable Registry Live</span>
            </div>

            {/* Credibility Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                dark ? 'bg-white/10 text-emerald-400' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" /> Serial-Numbered Proof
              </span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                dark ? 'bg-white/10 text-amber-400' : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                <Award className="w-3.5 h-3.5" /> 80% Rigor Standard
              </span>
            </div>
          </div>

          {/* Column 2: Academic Programs */}
          <div className="space-y-3">
            <h4 className={`text-xs font-extrabold uppercase tracking-wider ${dark ? 'text-gray-200' : 'text-stone-900'}`}>
              Curriculum Tracks
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  href="/courses/esg-basics-supply-chains" 
                  className={`group inline-flex items-center gap-1.5 transition-colors ${
                    dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'
                  }`}
                >
                  <span>Supply Chain ESG Basics</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900">
                    Flagship
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/courses/carbon-markets-irec-fundamentals" 
                  className={`group inline-flex items-center gap-1.5 transition-colors ${
                    dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'
                  }`}
                >
                  <span>Carbon Markets & I-RECs</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                    Popular
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/courses/esg-basics-supply-chains" 
                  className={`transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  Tier 1–4 Facility Tracing
                </Link>
              </li>
              <li>
                <Link 
                  href="/courses/esg-basics-supply-chains" 
                  className={`transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  Wet Processing & ZDHC Audits
                </Link>
              </li>
              <li className="pt-1">
                <Link 
                  href="/courses" 
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-4"
                >
                  All Course Catalog <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Verification & Audits */}
          <div className="space-y-3">
            <h4 className={`text-xs font-extrabold uppercase tracking-wider ${dark ? 'text-gray-200' : 'text-stone-900'}`}>
              Verification & Proof
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="/#credentials" 
                  className={`transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  Certificate Verification
                </a>
              </li>
              <li>
                <a 
                  href="/#credentials" 
                  className={`transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  Serial Number Lookup
                </a>
              </li>
              <li>
                <a 
                  href="/#why-hestiya" 
                  className={`transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  Educational Methodology
                </a>
              </li>
              <li>
                <a 
                  href="/#faq" 
                  className={`transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  Assessment Passing Rules
                </a>
              </li>
              <li>
                <Link 
                  href="/admin/login" 
                  className={`inline-flex items-center gap-1 transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Auditor & Faculty Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Student Hub */}
          <div className="space-y-3">
            <h4 className={`text-xs font-extrabold uppercase tracking-wider ${dark ? 'text-gray-200' : 'text-stone-900'}`}>
              Student Hub
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  href="/login" 
                  className={`transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  Student Sign In
                </Link>
              </li>
              <li>
                <Link 
                  href="/register" 
                  className={`transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  Create Student Account
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className={`transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  My Learning Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard/settings" 
                  className={`transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  Account Settings
                </Link>
              </li>
              <li>
                <a 
                  href="/#faq" 
                  className={`transition-colors ${dark ? 'text-gray-400 hover:text-emerald-400' : 'text-stone-600 hover:text-emerald-800'}`}
                >
                  Support & Help FAQ
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Mandates & Standards Ribbon */}
        <div className="py-8 border-b border-[#E7E2D7] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
            <Globe className="w-4 h-4 text-emerald-700" />
            <span>Curriculum Mapped Frameworks:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold">
            <span className="px-3 py-1 rounded-lg bg-white border border-[#E5E0D8] text-stone-700">
              GHG Protocol (Scope 1, 2, 3)
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#E5E0D8] text-stone-700">
              EU CSDDD & CSRD
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#E5E0D8] text-stone-700">
              German LkSG Act
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#E5E0D8] text-stone-700">
              ZDHC Roadmap to Zero
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#E5E0D8] text-stone-700">
              I-REC Standards
            </span>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className={`pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
          dark ? 'text-gray-500' : 'text-stone-500'
        }`}>
          <div>
            <p>© {new Date().getFullYear()} Hestiya University. All rights reserved.</p>
            <p className="text-[11px] text-stone-400 mt-1">
              Hestiya University provides forensic professional education in environmental compliance, supply chain auditing, and carbon governance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <a href="#faq" className="hover:text-emerald-700 transition-colors">Academic Integrity</a>
            <span className="text-stone-300">•</span>
            <a href="#credentials" className="hover:text-emerald-700 transition-colors">Credential Registry</a>
            <span className="text-stone-300">•</span>
            <Link href="/login" className="hover:text-emerald-700 transition-colors">Student Login</Link>
            <span className="text-stone-300">•</span>
            <Link href="/admin/login" className="hover:text-emerald-700 transition-colors">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
