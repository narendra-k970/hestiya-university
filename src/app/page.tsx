'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  Clock, 
  Globe, 
  Sparkles, 
  FileCheck, 
  ChevronDown, 
  ChevronRight,
  ExternalLink,
  Users,
  Layers,
  Factory,
  BarChart3,
  Check,
  Menu,
  X
} from 'lucide-react';
import Footer from '@/components/Footer';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Contact / Inquiry Popup State
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    course: 'ESG Basics for Fashion & Manufacturing Supply Chains',
    message: '',
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);
    setContactSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      const data = await res.json();
      if (data.success) {
        setContactSuccess(true);
        setTimeout(() => {
          setIsContactOpen(false);
          setContactSuccess(false);
          setContactData({
            name: '',
            email: '',
            phone: '',
            company: '',
            course: 'ESG Basics for Fashion & Manufacturing Supply Chains',
            message: '',
          });
        }, 2000);
      } else {
        setContactError(data.error || 'Failed to submit inquiry.');
      }
    } catch {
      setContactError('An error occurred. Please try again.');
    } finally {
      setContactSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const courses = [
    {
      id: 1,
      slug: "esg-basics-supply-chains",
      title: "ESG Basics for Fashion & Manufacturing Supply Chains",
      badge: "Flagship Program",
      hook: "A company can look spotless on financial audits and still be sitting on a catastrophic Scope 3 liability nobody was tracking.",
      duration: "4.5 – 6 hours",
      modules: 7,
      lessons: 22,
      level: "All Levels",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
      highlights: [
        "Tier 1 to Tier 4 supply chain mapping",
        "Wet processing, dyeing & ZDHC chemical compliance",
        "Scope 1, 2 vs Scope 3 greenhouse gas calculations",
        "German LkSG & EU CSDDD regulatory readiness"
      ]
    },
    {
      id: 2,
      slug: "carbon-markets-irec-fundamentals",
      title: "Carbon Markets & I-RECs Fundamentals",
      badge: "Specialized Track",
      hook: "Every company wants to be seen as sustainable, but wanting it and proving it through genuine additionality are very different things.",
      duration: "4.5 – 6 hours",
      modules: 7,
      lessons: 25,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
      highlights: [
        "Voluntary (VCM) vs Compliance (EU ETS) markets",
        "Additionality, permanence & baseline validation",
        "International Renewable Energy Certificates (I-RECs)",
        "Mitigating greenwashing and carbon credit double-counting"
      ]
    }
  ];

  const frameworks = [
    { name: "GHG Protocol", desc: "Scope 1, 2 & 3 Standard" },
    { name: "EU CSDDD & CSRD", desc: "Mandatory Corporate Due Diligence" },
    { name: "German LkSG", desc: "Supply Chain Due Diligence Act" },
    { name: "ZDHC Standard", desc: "Chemical Roadmap to Zero" },
    { name: "I-REC Standard", desc: "Verifiable Renewable Energy" },
    { name: "ILO Conventions", desc: "Fundamental Rights at Work" }
  ];

  const faqs = [
    {
      question: "Are there any prerequisites to enroll in Hestiya courses?",
      answer: "No prior background in ESG, carbon accounting, or auditing is required. Every program is built from the ground up: key terms are defined before they are used, and complex regulations like Scope 3 and EU CSDDD are broken down through concrete factory scenarios."
    },
    {
      question: "How are the assessments conducted, and what is the passing threshold?",
      answer: "Each course ends with a comprehensive multiple-choice assessment covering real-world auditing and compliance scenarios. The passing threshold is set at 80%. If you do not pass on your first attempt, you can review the curriculum and retake the test at no extra charge."
    },
    {
      question: "How do employers verify my Hestiya University certificate?",
      answer: "Every certificate issued contains a unique, tamper-proof serial number (e.g., HEST-2026-X89K2) and a scannable QR code linking to our public verification portal. Employers, auditors, and recruiters can verify your credential status and completion date instantly with zero friction."
    },
    {
      question: "Is the learning self-paced or tied to specific live cohort times?",
      answer: "All courses are fully self-paced, allowing you to learn on your own schedule. Lessons range from 12 to 20 minutes with inline checkpoint quizzes, so you can make progress whether you have 30 minutes during lunch or an afternoon dedicated to study."
    },
    {
      question: "Can I enroll a corporate team or an entire sustainability department?",
      answer: "Yes. We offer institutional onboarding with team progress dashboards, aggregate completion reports, and dedicated assessment tracking. Contact our team or sign up your managers to get started."
    }
  ];

  return (
    <div className="min-h-screen font-sans text-stone-900 selection:bg-amber-300 selection:text-stone-950 flex flex-col bg-[#F7F5F0]">
      
      {/* 
        Terra.do-Style Dotted Warm Background Wrapper 
      */}
      <div 
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: '#F7F5F0',
          backgroundImage: `
            radial-gradient(#D5CFBF 1.25px, transparent 1.25px),
            linear-gradient(135deg, #F1F5ED 0%, #FAF8F5 40%, #FAF2E8 100%)
          `,
          backgroundSize: '26px 26px, 100% 100%'
        }}
      >
        
        {/* Navigation Bar */}
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
              <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-950 whitespace-nowrap">
                Hestiya<span className="text-emerald-700 font-medium">University</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-stone-700 flex-nowrap shrink-0">
              <Link href="/university" className="whitespace-nowrap hover:text-emerald-700 transition-colors">
                Courses
              </Link>
              <a href="#about" className="whitespace-nowrap hover:text-emerald-700 transition-colors">
                About
              </a>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="whitespace-nowrap hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Talk to Us
              </button>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0 flex-nowrap">
              <Link 
                href="/login" 
                className="whitespace-nowrap text-sm font-semibold text-stone-800 hover:text-emerald-700 px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/university" 
                className="whitespace-nowrap text-sm font-bold bg-[#F59E0B] hover:bg-[#D97706] text-stone-950 px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all transform active:scale-95 inline-flex items-center gap-1.5"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-800 hover:bg-stone-200/50 shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-b border-[#E7E2D7] bg-[#FAF8F5] px-6 py-4 space-y-3">
              <Link 
                href="/university" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-700"
              >
                Courses
              </Link>
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-700"
              >
                About
              </a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsContactOpen(true);
                }}
                className="block w-full text-left py-2 text-sm font-semibold text-stone-800 hover:text-emerald-700 cursor-pointer"
              >
                Talk to Us
              </button>
              <div className="pt-3 border-t border-[#E7E2D7] flex flex-col gap-2">
                <Link 
                  href="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-stone-800 bg-white border border-[#DDD6C8] rounded-xl"
                >
                  Sign In
                </Link>
                <Link 
                  href="/university" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-bold bg-[#F59E0B] text-stone-950 rounded-xl"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          )}
        </header>

        {/* 
          Hero Section (Terra.do Inspired: High Energy, Editorial, Human-Centric) 
        */}
        <section className="pt-14 pb-20 lg:pt-20 lg:pb-28 max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-7">
            
            {/* Urgent Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs sm:text-sm font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>2026 Cohorts & Self-Paced Access Now Open</span>
              <span className="hidden sm:inline text-amber-400">•</span>
              <span className="hidden sm:inline font-semibold">Verified Certificates Included</span>
            </div>

            {/* Bold Terra.do Style Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 leading-[1.12]">
              Action-driven education for the{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-from-font">
                sustainable supply chain
              </span>{' '}
              era.
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Master the supply chain risks that balance sheets never see. Practical training on Scope 3 GHG accounting, factory ESG forensics, German LkSG & EU CSDDD compliance, and verifiable carbon credits.
            </p>

            {/* Dual CTAs (Amber Primary + Warm Stone Outline) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <Link 
                href="/university" 
                className="w-full sm:w-auto px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-stone-950 rounded-xl font-bold text-base shadow-[0_4px_16px_rgba(245,158,11,0.35)] transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
              >
                Explore All Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/university/esg-basics-supply-chains" 
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 text-stone-900 border border-[#DDD6C8] rounded-xl font-semibold text-base shadow-xs hover:border-stone-400 transition-all inline-flex items-center justify-center gap-2"
              >
                View Flagship Syllabus
              </Link>
            </div>

            {/* Trust Badges Strip */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>100% Self-Paced</strong> with checkpoint quizzes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Public Verification Link</strong> on all certificates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>80% Passing Mark</strong> ensures industry rigor</span>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* 
        Institutional Frameworks & Directives Ribbon 
      */}
      <section className="bg-white border-y border-[#E7E2D7] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-stone-500 mb-6">
            Curriculum mapped to global regulatory standards & carbon directives
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {frameworks.map((fw, idx) => (
              <div 
                key={idx} 
                className="bg-[#FAF8F5] border border-[#EBE7DF] rounded-xl p-3.5 text-center flex flex-col justify-center items-center hover:border-emerald-500 transition-colors"
              >
                <span className="font-bold text-xs text-stone-900">{fw.name}</span>
                <span className="text-[11px] text-stone-500 mt-0.5">{fw.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        Featured Flagship Program Spotlight (Terra.do "Learning for Action" Style) 
      */}
      <section className="py-20 bg-[#FAF8F5] border-b border-[#E7E2D7]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Flagship Certification
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
              Deep dive into the supply chain reality.
            </h2>
            <p className="text-stone-600 text-base sm:text-lg">
              Follow our signature program built to expose how operational decisions create silent ESG liabilities across global supplier tiers.
            </p>
          </div>

          {/* Large Editorial Feature Card */}
          <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-0">
              
              {/* Left Column: Narrative Hook & Breakdown */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                      Comprehensive 7-Module Masterclass
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-stone-500">
                      <Clock className="w-3.5 h-3.5 text-stone-400" /> 4.5 – 6 Hours
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-stone-500">
                      <BookOpen className="w-3.5 h-3.5 text-stone-400" /> 22 Applied Lessons
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 leading-tight">
                    ESG Basics for Fashion & Manufacturing Supply Chains
                  </h3>

                  <blockquote className="border-l-4 border-amber-400 pl-4 py-1 italic text-stone-700 text-sm sm:text-base leading-relaxed">
                    &ldquo;For decades, supply chains ran on three numbers: cost, speed, and quality. Today, they run on a fourth: verifiability. The gap between what a company controls and what it is responsible for is where ESG risk collects.&rdquo;
                  </blockquote>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    In this flagship program, you follow the forensic case study of a single company through every supplier tier—from clean corporate audit reports to unverified subcontractor failures, wastewater dyeing violations, and Scope 3 emissions traps.
                  </p>

                  {/* Program Curriculum Highlights */}
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-stone-700 font-medium">
                        Tier 1 vs Tier 4 facility traceability
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-stone-700 font-medium">
                        Wastewater testing & ZDHC guidelines
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-stone-700 font-medium">
                        Scope 3 greenhouse gas calculations
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-stone-700 font-medium">
                        ILO labour rights & supplier reality
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link 
                    href="/university/esg-basics-supply-chains" 
                    className="px-6 py-3.5 bg-stone-950 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm transition-all text-center inline-flex items-center justify-center gap-2"
                  >
                    Start Flagship Course <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="/university/esg-basics-supply-chains" 
                    className="px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl text-sm transition-all text-center"
                  >
                    View Full 7-Module Syllabus
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Specs & Course Structure Preview */}
              <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-[#0F1E19] text-white p-8 sm:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Award className="w-3.5 h-3.5" /> Certificate Program
                  </div>

                  <h4 className="text-xl font-bold text-white">Course Syllabus Snapshot</h4>

                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                      <div className="flex justify-between items-center text-xs font-bold text-amber-300 mb-1">
                        <span>Module 01</span>
                        <span>45 Mins</span>
                      </div>
                      <p className="text-sm font-semibold text-white">ESG Fundamentals & Direct Control vs Scope 3</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                      <div className="flex justify-between items-center text-xs font-bold text-amber-300 mb-1">
                        <span>Module 02</span>
                        <span>50 Mins</span>
                      </div>
                      <p className="text-sm font-semibold text-white">Where the Footprint Hides: Textile Wet Processing</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                      <div className="flex justify-between items-center text-xs font-bold text-amber-300 mb-1">
                        <span>Module 03</span>
                        <span>60 Mins</span>
                      </div>
                      <p className="text-sm font-semibold text-white">Carbon Credits, I-RECs & Scope 2 Energy Tracking</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                      <div className="flex justify-between items-center text-xs font-bold text-amber-300 mb-1">
                        <span>Module 04 – 07</span>
                        <span>4 Modules</span>
                      </div>
                      <p className="text-sm font-semibold text-white">Labour Principles, Governance & Audit Readiness</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/15 flex items-center justify-between text-xs text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Serial-Numbered Certificate
                  </span>
                  <span className="font-semibold text-amber-300">80% Pass Required</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 
        The 3 Pillars of Hestiya (Educational Philosophy / About Hestiya University) 
      */}
      <section id="about" className="py-20 bg-white scroll-mt-20">
        <div id="why-hestiya" className="scroll-mt-20" />
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider">
              Educational Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
              Designed for real audits, not corporate rhetoric.
            </h2>
            <p className="text-stone-600 text-base sm:text-lg">
              Most ESG training offers generic declarations. Hestiya University teaches the operational forensics required when regulators and auditors show up.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-[#FAF8F5] border border-[#E7E2D7] rounded-3xl p-8 hover:border-emerald-600 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Factory className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-stone-950 mb-3">
                Factory-Floor Forensics
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                We trace the physical reality: wastewater effluent test logs, unapproved sub-contracting shifts, cotton ginning origins, and hazardous chemical runoffs. You learn what happens on the ground, not in a press release.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#FAF8F5] border border-[#E7E2D7] rounded-3xl p-8 hover:border-emerald-600 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-stone-950 mb-3">
                Self-Paced Precision
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Structured for busy executives, auditors, and students. Concise 12 to 20 minute lessons featuring checkpoint quizzes, case study narratives, and actionable takeaway summaries with no filler.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#FAF8F5] border border-[#E7E2D7] rounded-3xl p-8 hover:border-emerald-600 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-stone-950 mb-3">
                Verifiable Credentials
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Passing our 80% benchmark grants a cryptographic Hestiya certificate with a public URL and serial code. Add it to LinkedIn, present it to employers, and demonstrate verifiable mastery.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 
        Live Course Catalog Section 
      */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#E7E2D7]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider mb-2">
                Course Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                Explore our certification programs
              </h2>
            </div>
            <Link 
              href="/university" 
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-950 hover:underline"
            >
              Browse complete syllabus archive <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden flex flex-col justify-between hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all group"
              >
                <div>
                  {/* Image banner with overlay tag */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${course.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-extrabold text-xs shadow-xs">
                        {course.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-300" /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-amber-300" /> {course.modules} Modules • {course.lessons} Lessons
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-extrabold text-stone-950 leading-snug group-hover:text-emerald-800 transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-sm text-stone-600 leading-relaxed italic">
                      &ldquo;{course.hook}&rdquo;
                    </p>

                    <div className="pt-2 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Key Focus Areas:</p>
                      {course.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-8 pt-0">
                  <Link 
                    href={`/university/${course.slug}`}
                    className="w-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-emerald-800 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    Enroll in Program <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 
        Cryptographic Certificate & Verification Showcase 
      */}
      <section id="credentials" className="py-20 bg-white border-t border-[#E7E2D7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Verification Explanation */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Verifiable Trust
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight leading-tight">
                A certificate that employers and auditors can actually verify.
              </h2>

              <p className="text-stone-600 text-base leading-relaxed">
                In an era of rampant greenwashing claims, PDF certificates without proof carry zero weight. Every Hestiya University graduate receives an immutable, publicly verifiable record.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 mt-1">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Unique Serial Number Tracking</h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Each credential is coded with a unique cryptographic hash (e.g. <code className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-800 font-mono">HEST-2026-X89K2</code>) linked directly to our central register.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-800 mt-1">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">One-Click LinkedIn & Resume Sharing</h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Recruiters and corporate partners can verify test scores, curriculum versions, and issue dates with a single click.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-stone-100 text-stone-800 mt-1">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Rigorous 80% Passing Threshold</h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      No participation trophies. Candidates must demonstrate firm mastery of auditing logic, Scope 3 definitions, and compliance rules.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Certificate Card Mockup */}
            <div className="lg:col-span-6">
              <div className="bg-[#FAF8F5] border-2 border-[#E5E0D8] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative overflow-hidden">
                
                {/* Decorative Seal Background */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />

                <div className="border-4 border-double border-[#D5CFBF] p-6 sm:p-8 rounded-2xl bg-white space-y-6">
                  
                  {/* Certificate Header */}
                  <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                    <div className="flex items-center gap-2">
                      <Image src="/images/logo.png" alt="Hestiya" width={28} height={28} className="w-7 h-7 object-contain" />
                      <span className="font-extrabold text-sm tracking-tight text-stone-900">
                        HESTIYA UNIVERSITY
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider">
                      Verified Credential
                    </span>
                  </div>

                  {/* Certificate Body */}
                  <div className="text-center space-y-2 py-2">
                    <p className="text-[11px] uppercase tracking-widest text-stone-400 font-bold">This certifies that</p>
                    <h3 className="text-2xl font-serif font-bold text-stone-950">Aiden Sharma</h3>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto">
                      has successfully satisfied all rigorous curriculum requirements and scored 92% in the examination for
                    </p>
                    <h4 className="text-sm font-bold text-emerald-800 pt-1">
                      ESG Basics for Fashion & Manufacturing Supply Chains
                    </h4>
                  </div>

                  {/* Certificate Footer Details */}
                  <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500 font-mono">
                    <div>
                      <span>SERIAL: </span>
                      <strong className="text-stone-800 font-mono">HEST-2026-X89K2</strong>
                    </div>
                    <div>
                      <span>STATUS: </span>
                      <strong className="text-emerald-700">VERIFIED ACTIVE</strong>
                    </div>
                  </div>

                </div>

                <div className="text-center pt-4">
                  <span className="text-xs text-stone-500">
                    Tamper-proof verifiable link issued on completion of assessment
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        Who This Is For (Audience Grid) 
      */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#E7E2D7]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider">
              Audience & Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
              Built for people who need practical solutions.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Whether you are managing tier-1 supplier relations or advising corporate boards on carbon exposure.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white border border-[#E5E0D8] p-6 rounded-2xl space-y-3 hover:border-emerald-500 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="font-bold text-stone-900 text-base">Supply Chain & Sourcing</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Directors, buyers, and sourcing teams seeking to identify upstream compliance liabilities before customs or audits intervene.
              </p>
            </div>

            <div className="bg-white border border-[#E5E0D8] p-6 rounded-2xl space-y-3 hover:border-emerald-500 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="font-bold text-stone-900 text-base">Sustainability & ESG Leads</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Sustainability practitioners tasked with measuring Scope 3 footprints, drafting CSRD reports, and navigating carbon markets.
              </p>
            </div>

            <div className="bg-white border border-[#E5E0D8] p-6 rounded-2xl space-y-3 hover:border-emerald-500 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="font-bold text-stone-900 text-base">Auditors & Legal Counsel</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Lawyers, risk officers, and auditors examining supplier compliance under the German LkSG Act and EU Directives.
              </p>
            </div>

            <div className="bg-white border border-[#E5E0D8] p-6 rounded-2xl space-y-3 hover:border-emerald-500 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                04
              </div>
              <h4 className="font-bold text-stone-900 text-base">Students & Career Changers</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                University students and professionals pivoting into high-growth ESG auditing and sustainable operations roles.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 
        Interactive FAQ Accordion 
      */}
      <section id="faq" className="py-20 bg-white border-t border-[#E7E2D7]">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center space-y-3 mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider">
              Answers & Clarifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Everything you need to know about our certifications and format.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="border border-[#E5E0D8] rounded-2xl overflow-hidden transition-all bg-[#FAF8F5] hover:border-emerald-600/60 hover:shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-stone-900 hover:text-emerald-800 transition-colors cursor-pointer select-none"
                  >
                    <span className="text-base sm:text-lg cursor-pointer">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 text-stone-500 cursor-pointer ${isOpen ? 'rotate-180 text-emerald-700' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-stone-600 leading-relaxed border-t border-[#EAE5DB] pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 
        Bottom Anchor Conversion Banner (Terra.do Dark Charcoal / Deep Forest Anchor) 
      */}
      <section className="bg-[#0B1E17] text-white py-20 relative overflow-hidden">
        {/* Glow Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Ready to master sustainable supply chain compliance?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Build the audit-ready skills that global supply chains urgently need.
          </h2>

          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Enroll today to access self-paced modules, interactive case studies, and earn your cryptographically verifiable certification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/university" 
              className="w-full sm:w-auto px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-stone-950 font-bold rounded-xl text-base shadow-lg transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
            >
              Explore Course Catalog <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl text-base transition-all inline-flex items-center justify-center"
            >
              Sign In to Student Portal
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-8 text-xs text-stone-400">
            <span>✓ Instant Access</span>
            <span>✓ Self-Paced Schedule</span>
            <span>✓ Verifiable Certificate</span>
            <span>✓ Retakes Included</span>
          </div>

        </div>
      </section>

      {/* Contact & Enterprise Inquiry Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in fade-in duration-200 my-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Admissions & Enterprise
                </span>
                <h3 className="text-xl font-extrabold text-stone-950 mt-1">
                  Contact Academic Team
                </h3>
              </div>
              <button 
                onClick={() => setIsContactOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {contactSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-stone-950">Inquiry Received!</h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Thank you for reaching out. One of our sustainability faculty advisors will get in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 pt-4">
                
                {contactError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {contactError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      placeholder="e.g. Rachel Adams"
                      className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="rachel@company.com"
                      className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 font-medium"
                    />
                  </div>
                </div>

                {/* Company / Organization (Requested) */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={contactData.company}
                    onChange={(e) => setContactData({ ...contactData, company: e.target.value })}
                    placeholder="e.g. Zara, Arvind Mills, EcoAudit Partners..."
                    className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Program of Interest
                    </label>
                    <select
                      value={contactData.course}
                      onChange={(e) => setContactData({ ...contactData, course: e.target.value })}
                      className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 font-medium"
                    >
                      <option value="ESG Basics for Fashion & Manufacturing Supply Chains">
                        ESG Basics for Supply Chains
                      </option>
                      <option value="Carbon Markets & I-RECs Fundamentals">
                        Carbon Markets & I-RECs
                      </option>
                      <option value="Enterprise Cohort Training">
                        Enterprise Team Training
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Message / Inquiries
                  </label>
                  <textarea
                    rows={3}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Tell us about your team size, supply chain audit goals, or questions..."
                    className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 font-medium"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsContactOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-stone-700 hover:bg-stone-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="px-6 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-stone-950 font-bold text-xs rounded-xl shadow-xs transition-all disabled:opacity-50"
                  >
                    {contactSubmitting ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* Footer */}
      <Footer dark={false} />

    </div>
  );
}
