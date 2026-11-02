'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, 
  BookOpen, 
  ArrowRight, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Layers, 
  Factory, 
  FileCheck2, 
  Users, 
  Building2, 
  ChevronDown, 
  ChevronRight, 
  Check, 
  X, 
  MessageSquare, 
  Sparkles, 
  BarChart3, 
  Globe2,
  FileSpreadsheet,
  AlertCircle,
  Lock,
  Mail
} from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AdvisorModal from '@/components/AdvisorModal';

interface CourseTrack {
  id: string;
  slug: string;
  category: 'supply-chain' | 'carbon-markets';
  tag: string;
  badgeColor: string;
  title: string;
  hook: string;
  description: string;
  duration: string;
  modulesCount: number;
  lessonsCount: number;
  passMark: string;
  level: string;
  keyTopics: string[];
  caseStudy: string;
  image: string;
  frameworks: string[];
}

const coursesData: CourseTrack[] = [
  {
    id: 'esg-basics',
    slug: 'esg-basics-supply-chains',
    category: 'supply-chain',
    tag: 'Flagship Track',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-200',
    title: 'ESG Basics for Fashion & Manufacturing Supply Chains',
    hook: 'A company can look spotless on every financial ledger while harboring catastrophic liabilities three tiers deep in its supply chain.',
    description: 'An intensive, forensic journey through modern global manufacturing. Master Tier 1–4 supply chain mapping, wastewater effluent testing logs, unapproved sub-contracting shifts, ZDHC chemical protocols, and how Scope 3 emissions accumulate where brand oversight is weakest.',
    duration: '4.5 – 6 Hours',
    modulesCount: 7,
    lessonsCount: 22,
    passMark: '80% Benchmark',
    level: 'Foundational to Practitioner',
    keyTopics: [
      'Tier 1 to Tier 4 Supply Chain Mapping & Forensic Audits',
      'Wet Processing, Textile Dyeing & ZDHC Chemical Liabilities',
      'Scope 3 GHG Accounting in Cut-Make-Trim (CMT) Facilities',
      'The 5 ILO Fundamental Principles & Real Labor Realities',
      'The Three Lines Model: Closing the Accountability Gap'
    ],
    caseStudy: 'The "ABC Apparel" Forensic Audit: How a high-street fashion brand missed subcontractor wastewater dumping despite an "A" sustainability rating.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop',
    frameworks: ['GHG Protocol Scope 3', 'ZDHC MRSL 3.1', 'ILO Core Conventions', 'Three Lines Model']
  },
  {
    id: 'carbon-markets',
    slug: 'carbon-markets-irec-fundamentals',
    category: 'carbon-markets',
    tag: 'Specialized Track',
    badgeColor: 'bg-amber-100 text-amber-950 border-amber-200',
    title: 'Carbon Markets & I-RECs Fundamentals',
    hook: 'Every corporation claims to be pursuing Net-Zero. Proving additionality and avoiding double-counting is where credibility is won or lost.',
    description: 'Deconstruct voluntary vs. compliance carbon markets (VCM & ETS). Learn additionality verification, permanence risk, Article 6 of the Paris Agreement, and how International Renewable Energy Certificates (I-RECs) are issued, retired, and audited across global energy grids.',
    duration: '5 – 6.5 Hours',
    modulesCount: 7,
    lessonsCount: 25,
    passMark: '80% Benchmark',
    level: 'Intermediate Specialist',
    keyTopics: [
      'Voluntary Carbon Markets (VCM) vs Compliance Cap-and-Trade (ETS)',
      'Additionality & Baseline Forensics: Separating real offsets from paper credits',
      'I-REC & EAC Mechanics: Tracking registry issuance and retirement audits',
      'Scope 2 Accounting: Location-Based vs Market-Based GHG Protocol standards',
      'Article 6.2 & 6.4: Corresponding adjustments and sovereign carbon sovereignty'
    ],
    caseStudy: 'Grid Displacement vs Paper Offsets: An audit of a 50 MW solar park I-REC issuance and corporate claim validation.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop',
    frameworks: ['I-REC Standard', 'GHG Protocol Scope 2 Guidance', 'Verra VCS', 'Gold Standard']
  }
];

export default function CourseCataloguePage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'supply-chain' | 'carbon-markets'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Advisor Modal State
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);

  const filteredCourses = activeFilter === 'all' 
    ? coursesData 
    : coursesData.filter(c => c.category === activeFilter);

  const faqItems = [
    {
      q: 'How are Hestiya credentials verified by employers and auditors?',
      a: 'Every student who completes our curriculum and achieves an 80%+ score on the assessment is issued a tamper-evident cryptographic certificate. Each credential contains a unique serial number (e.g., HEST-2026-X89K2) and a permanent public verification URL (/verify/[serial]). Auditors, compliance heads, and hiring managers can verify issuance dates, assessment scores, and syllabus mastery in real-time without logging in.'
    },
    {
      q: 'Are these courses self-paced or cohort-based with live classes?',
      a: 'Our curriculum is 100% self-paced and optimized for working professionals. Lessons are structured in high-impact 12 to 18-minute units with checkpoint quizzes, interactive slides, and case study breakdowns. You have lifetime access to course materials and can complete modules around your schedule.'
    },
    {
      q: 'What is the passing benchmark for the certification exam?',
      a: 'A score of 80% or higher is required to unlock your verified credential. If you do not pass on your first attempt, you can review specific module checkpoints and retake the final assessment without penalty.'
    },
    {
      q: 'Can our company enroll an entire procurement or audit cohort?',
      a: 'Yes. We offer Corporate Cohort packages with bulk student seating, centralized manager progress dashboards, downloadable SCORM LMS packages for your internal learning system, and customized private audit workshops.'
    },
    {
      q: 'What makes Hestiya courses different from generic ESG webinars?',
      a: 'Most sustainability courses focus on broad definitions and PR promises. Hestiya courses are built like forensic audit inspections: we teach you how suppliers falsify overtime timecards, how effluent treatment plants are bypassed at midnight, how unbundled I-RECs are double-counted, and how to verify real data using GHG Protocol formulas.'
    },
    {
      q: 'Is there any prerequisite knowledge required before taking these courses?',
      a: 'None for our flagship ESG Basics track—we build from core principles to advanced audit frameworks. For the Carbon Markets track, a basic familiarity with energy metrics (kWh, MWh) or corporate sustainability concepts is helpful, though all foundational formulas are taught step-by-step.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111827] flex flex-col font-sans selection:bg-[#15803d] selection:text-white">
      
      {/* 1. Universal Top Header */}
      <Header />

      {/* 2. Hero Header Section */}
      <header className="py-16 md:py-24 border-b border-[#E5E0D8] relative overflow-hidden bg-gradient-to-b from-[#F7F5F0] via-[#F2EFE9] to-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Forensic Environmental & Supply Chain Certification
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111827] leading-[1.1] tracking-tight font-serif">
              Master the supply chains and carbon markets the world runs on.
            </h1>

            <p className="text-lg sm:text-xl text-[#4B5563] leading-relaxed font-normal">
              Zero PR puff pieces. Our curriculum delivers the forensic methods, chemical protocols, and regulatory mechanics that auditors, ESG controllers, and supply chain leaders need to spot liabilities before regulators do.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs sm:text-sm font-semibold text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803d]" />
                <span>100% Self-Paced Text & Visuals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803d]" />
                <span>Permanent Public Verifiable Credentials</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803d]" />
                <span>Real Industrial Case Studies & Audit Files</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 4. Filter & Course Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 w-full space-y-12">
        
        {/* Track Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#E5E0D8]">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Available Programs</span>
            <h2 className="text-2xl font-black text-[#111827] font-serif">Explore Our Curriculum</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#15803d] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              All Courses (2)
            </button>
            <button
              onClick={() => setActiveFilter('supply-chain')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === 'supply-chain'
                  ? 'bg-[#15803d] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              Supply Chain Due Diligence (1)
            </button>
            <button
              onClick={() => setActiveFilter('carbon-markets')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === 'carbon-markets'
                  ? 'bg-[#15803d] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              Carbon & Energy Markets (1)
            </button>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#15803d]/40"
            >
              {/* Card Header & Media */}
              <div className="space-y-6">
                
                {/* Visual Image Banner */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                  <Image 
                    src={course.image} 
                    alt={course.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${course.badgeColor}`}>
                      {course.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 block mb-1">
                      {course.level} • {course.duration}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-serif leading-tight">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="px-6 sm:px-8 space-y-5">
                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                    {course.description}
                  </p>

                  {/* Key Syllabus Outcomes */}
                  <div className="space-y-2.5 pt-2 border-t border-stone-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                      Core Forensic Competencies:
                    </span>
                    <ul className="space-y-1.5">
                      {course.keyTopics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                          <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
                          <span className="leading-snug">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Case Study Callout */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-200/80 space-y-1">
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-600" /> Real-World Applied Case:
                    </span>
                    <p className="text-xs text-stone-700 font-medium italic">
                      "{course.caseStudy}"
                    </p>
                  </div>

                  {/* Framework Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.frameworks.map((fw, fIdx) => (
                      <span key={fIdx} className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md">
                        {fw}
                      </span>
                    ))}
                  </div>

                </div>

              </div>

              {/* Card Footer Bar */}
              <div className="p-6 sm:p-8 pt-6 border-t border-[#E5E0D8] bg-stone-50/50 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs text-stone-500 font-medium">Curriculum Structure:</span>
                  <div className="text-sm font-bold text-stone-900">
                    {course.modulesCount} Modules • {course.lessonsCount} Interactive Lessons
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-sm font-semibold transition-all text-center cursor-pointer"
                  >
                    View Syllabus
                  </Link>
                  <Link
                    href={`/register?course=${course.slug}`}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#15803d] hover:bg-[#166534] text-white text-sm font-bold shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 5. Why Hestiya Courses vs Generic ESG Webinars Comparison Table */}
        <section className="bg-white rounded-3xl border border-[#E5E0D8] p-8 sm:p-12 shadow-sm space-y-8 mt-16">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15803d]">Forensic Rigor</span>
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#111827]">
              Why Hestiya vs. Generic Corporate ESG Training
            </h3>
            <p className="text-sm text-stone-600">
              Most sustainability education was written by marketing departments. Our courses are built like third-party forensic audits.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="py-3 px-4 font-bold text-stone-500 uppercase tracking-wider">Evaluation Dimension</th>
                  <th className="py-3 px-4 font-bold text-stone-400 uppercase tracking-wider">Generic ESG Webinars</th>
                  <th className="py-3 px-4 font-bold text-[#15803d] uppercase tracking-wider bg-emerald-50/50 rounded-t-xl">Hestiya Courses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                <tr>
                  <td className="py-4 px-4 font-semibold text-stone-900">Curriculum Depth</td>
                  <td className="py-4 px-4 text-stone-500">High-level definitions (What does E, S, G stand for?)</td>
                  <td className="py-4 px-4 font-bold text-stone-950 bg-emerald-50/30">Tier 1–4 supplier mapping, ZDHC chemical wastewater math, Scope 3 boundaries</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-stone-900">Audit Fraud Realities</td>
                  <td className="py-4 px-4 text-stone-500">Assumes suppliers always report honest self-checklists</td>
                  <td className="py-4 px-4 font-bold text-stone-950 bg-emerald-50/30">Dissects double-bookkeeping, shadow subcontracting shifts & midnight ETP bypasses</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-stone-900">Carbon Markets</td>
                  <td className="py-4 px-4 text-stone-500">Equates planting trees with unconditional Net-Zero claims</td>
                  <td className="py-4 px-4 font-bold text-stone-950 bg-emerald-50/30">Additionality testing, baseline manipulation, I-REC tracking & Article 6 sovereign rules</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-stone-900">Credential Integrity</td>
                  <td className="py-4 px-4 text-stone-500">Unverifiable PDF certificates that anyone can forge</td>
                  <td className="py-4 px-4 font-bold text-stone-950 bg-emerald-50/30">Cryptographic hashes, serial-indexed registry lookup & instant QR verifiability</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Corporate Cohorts & Team Training Banner */}
        <section className="bg-gradient-to-br from-[#111827] via-[#1F2937] to-[#111827] text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-stone-800 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> Enterprise & Supplier Cohorts
            </span>

            <h3 className="text-3xl sm:text-4xl font-black font-serif leading-tight">
              Train your entire procurement, sourcing, and sustainability team.
            </h3>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              We partner with global retail brands, textile export consortiums, and certification bodies to upskill supply chain teams. Bulk enrollment, manager analytics, and custom company workshops are available.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setIsAdvisorModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-[#15803d] hover:bg-[#166534] text-white text-sm font-bold shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Talk to an Education Advisor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 7. Frequently Asked Questions */}
        <section className="space-y-6 pt-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15803d]">Clarity First</span>
            <h3 className="text-3xl font-black font-serif text-[#111827]">Frequently Asked Questions</h3>
            <p className="text-sm text-stone-600">Everything you need to know about our certifications and format.</p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-[#E5E0D8] bg-white rounded-3xl border border-[#E5E0D8] p-6 sm:p-8 shadow-xs">
            {faqItems.map((item, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left gap-4 text-stone-800 hover:text-[#15803d] transition-colors cursor-pointer py-1"
                >
                  <span className="text-base sm:text-lg font-medium text-stone-900 leading-snug">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                    expandedFaq === idx ? 'rotate-180 text-[#15803d]' : ''
                  }`} />
                </button>
                {expandedFaq === idx && (
                  <p className="pt-3 text-stone-600 text-sm sm:text-base leading-relaxed animate-in fade-in duration-200">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Unified Education Advisor Modal */}
      <AdvisorModal 
        isOpen={isAdvisorModalOpen} 
        onClose={() => setIsAdvisorModalOpen(false)} 
        title="Talk to an Education Advisor"
        subtitle="Get custom enterprise pricing, syllabus details, or team onboarding support."
      />

      {/* 9. Footer */}
      <Footer />

    </div>
  );
}
