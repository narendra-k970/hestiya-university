'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  Clock, 
  BookOpen, 
  FileCheck, 
  Target, 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  PlayCircle, 
  ArrowRight, 
  ArrowLeft,
  Award,
  Sparkles,
  Building2,
  FileSpreadsheet,
  Check,
  Send,
  X,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AdvisorModal from '@/components/AdvisorModal';

interface LessonItem {
  id: number;
  title: string;
  duration: string;
  hasQuiz: boolean;
}

interface ModuleItem {
  order: number;
  title: string;
  lessons: number;
  est: string;
  lessonList: LessonItem[];
}

interface CourseData {
  slug: string;
  title: string;
  category: string;
  tag: string;
  badgeColor: string;
  hook: string;
  description: string[];
  duration: string;
  modulesCount: number;
  lessonsCount: number;
  passMark: string;
  level: string;
  prerequisites: string;
  assessment: string;
  frameworks: string[];
  caseStudy: {
    title: string;
    situation: string;
    failure: string;
    rootCause: string;
    takeaway: string;
  };
  audience: string[];
  ilos: string[];
  modules: ModuleItem[];
}

const COURSES_DIRECTORY: Record<string, CourseData> = {
  'esg-basics-supply-chains': {
    slug: 'esg-basics-supply-chains',
    title: 'ESG Basics for Fashion & Manufacturing Supply Chains',
    category: 'Supply Chain Due Diligence & Traceability',
    tag: 'Flagship Track',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    hook: 'A company can look immaculate on every financial ledger while sitting on catastrophic environmental and labor liabilities three tiers deep in its supply chain.',
    description: [
      'For decades, global supply chains operated purely on three metrics: cost, speed, and product quality. Today, international regulators and financial markets demand a fourth: forensic verifiability. A multinational brand might employ a few thousand people directly, yet rely on hundreds of thousands of workers across indirect supplier facilities it does not own.',
      'The gap between what a company legally controls and what it is publicly held accountable for is where catastrophic ESG risks accumulate. This course walks you through that exact gap. You will learn how everyday commercial decisions—a last-minute fabric switch, an aggressive price discount, or a compressed production schedule—quietly trigger unauthorized subcontracting, unrecorded overtime, and hazardous chemical discharge.',
      'We follow a single fictional enterprise, ABC Brand, from a clean corporate audit through to a public sustainability scandal. By examining the precise mechanics of ABC\'s failure, you will master the forensic tools to spot, measure, and manage supply chain risks before an international auditor or regulator does.'
    ],
    duration: '4.5 – 6 Hours',
    modulesCount: 7,
    lessonsCount: 22,
    passMark: '80% Benchmark',
    level: 'Foundational to Practitioner',
    prerequisites: 'None. Cross-functional operational track.',
    assessment: '19 MCQ Checkpoints + 1 Comprehensive Capstone',
    frameworks: ['GHG Protocol Corporate Standard', 'ZDHC MRSL 3.1', 'ILO Fundamental Conventions', 'EU CSDDD / German LkSG', 'Three Lines Model'],
    caseStudy: {
      title: 'The "ABC Apparel" Forensic Audit Scandal',
      situation: 'Brand ABC held a pristine "AAA" corporate sustainability rating, verified by annual third-party social questionnaires and glossy PDF reports.',
      failure: 'Investigative field reporters discovered that ABC\'s primary Tier-1 supplier was running three nocturnal shifts per week at an uninspected dye workshop 14 km away. Untreated chemical dye effluent was discharged directly into a municipal irrigation canal to avoid the electricity cost of operating the Effluent Treatment Plant (ETP).',
      rootCause: 'Commercial procurement teams at ABC had demanded an additional 12% margin reduction while shortening delivery turnaround from 90 days to 45 days. The Tier-1 plant could not legally manufacture the order volume in time without unauthorized subcontracting.',
      takeaway: 'Commercial purchasing practices are the primary driver of supply chain ESG failure. Purchasing below true cost structurally forces suppliers to circumvent environmental and labor standards.'
    },
    audience: [
      'Procurement, Sourcing & Supply Chain Directors',
      'ESG Controllers, Compliance Officers & Internal Auditors',
      'Sustainability Specialists & CSR Managers',
      'Factory Operations Managers & Tier 1/2 Suppliers',
      'Early-career professionals and graduate students entering ESG'
    ],
    ilos: [
      'Deconstruct Environmental, Social, and Governance pillars into concrete operational metrics rather than blended marketing scores.',
      'Map multi-tier supply networks from Tier 1 Cut-Make-Trim (CMT) to Tier 4 raw agricultural and petrochemical extraction.',
      'Differentiate between Scope 1, 2, and 3 emissions under the GHG Protocol, identifying why 80%+ of footprint sits in Tier 2-4.',
      'Audit chemical management systems against ZDHC Manufacturing Restricted Substances Lists (MRSL) vs Product RSLs.',
      'Identify the hallmarks of "Double Bookkeeping" and unauthorized shadow subcontracting during supplier audits.',
      'Apply the Three Lines Model to establish clear accountability between commercial buyers, ESG officers, and board directors.'
    ],
    modules: [
      {
        order: 1,
        title: 'ESG Fundamentals: Definitions and Industry Applications',
        lessons: 3,
        est: '45 mins',
        lessonList: [
          { id: 1, title: 'What is ESG, and Why Should We Care?', duration: '14 mins', hasQuiz: false },
          { id: 2, title: 'ESG in the Supply Chain: Why It Starts Here', duration: '15 mins', hasQuiz: false },
          { id: 3, title: 'Why Industries Are Switching to ESG Now', duration: '16 mins', hasQuiz: false }
        ]
      },
      {
        order: 2,
        title: 'Where the Footprint is Actually Generated',
        lessons: 3,
        est: '50 mins',
        lessonList: [
          { id: 4, title: 'Meet Scope 1, 2 and 3', duration: '16 mins', hasQuiz: false },
          { id: 5, title: 'How the Footprint Builds Without Anyone Noticing', duration: '16 mins', hasQuiz: false },
          { id: 6, title: 'From Raw Material to Final Product: Tracing the Journey', duration: '18 mins', hasQuiz: false }
        ]
      },
      {
        order: 3,
        title: 'Turning Emissions into Rewards: Carbon Credits and I-RECs',
        lessons: 4,
        est: '60 mins',
        lessonList: [
          { id: 7, title: 'What Are Carbon Credits and I-RECs?', duration: '15 mins', hasQuiz: false },
          { id: 8, title: 'The Thin Line Between Reducing and Offsetting', duration: '15 mins', hasQuiz: false },
          { id: 9, title: 'Why These Certificates Are a Real Asset Now', duration: '15 mins', hasQuiz: false },
          { id: 10, title: 'Why Changes Made Today Matter Tomorrow', duration: '14 mins', hasQuiz: false }
        ]
      },
      {
        order: 4,
        title: 'The Foundation of Our Environment: People and Principles',
        lessons: 3,
        est: '45 mins',
        lessonList: [
          { id: 11, title: 'The Social Pillar: Why People Decide the Result', duration: '16 mins', hasQuiz: false },
          { id: 12, title: 'The Governance Pillar: How Transparency Builds Trust', duration: '14 mins', hasQuiz: false },
          { id: 13, title: 'Three Pillars, One Trustworthy Picture', duration: '15 mins', hasQuiz: false }
        ]
      },
      {
        order: 5,
        title: 'Real-Life Challenges That Hurt Our Efficiency',
        lessons: 3,
        est: '50 mins',
        lessonList: [
          { id: 14, title: 'Fast Fashion: A Bane to Sustainability', duration: '18 mins', hasQuiz: false },
          { id: 15, title: 'How Sourcing, Dyeing, Labour and Greenwashing Quietly Erode Trust', duration: '16 mins', hasQuiz: false },
          { id: 16, title: 'Case Study: When Sustainability Claims Met a Regulator', duration: '16 mins', hasQuiz: false }
        ]
      },
      {
        order: 6,
        title: 'From Papers to Peers: Changing Reality in Real Time',
        lessons: 3,
        est: '45 mins',
        lessonList: [
          { id: 17, title: 'The "It\'s Not Our Job to Audit" Mindset', duration: '15 mins', hasQuiz: false },
          { id: 18, title: 'Different Departments, One Goal', duration: '15 mins', hasQuiz: false },
          { id: 19, title: 'Learning How to Track Everyday Emissions', duration: '15 mins', hasQuiz: false }
        ]
      },
      {
        order: 7,
        title: 'Traces to Capital: What Actual Market Players Ask For',
        lessons: 3,
        est: '45 mins',
        lessonList: [
          { id: 20, title: 'Who Generates, Who Buys, and How These Certificates Are Sold', duration: '16 mins', hasQuiz: false },
          { id: 21, title: 'The Relevance of These Certificates', duration: '14 mins', hasQuiz: false },
          { id: 22, title: 'Government-Established Bodies Versus Private Market Players', duration: '15 mins', hasQuiz: false }
        ]
      }
    ]
  },

  'carbon-markets-irec-fundamentals': {
    slug: 'carbon-markets-irec-fundamentals',
    title: 'Carbon Markets & I-RECs Fundamentals',
    category: 'Renewable Energy & Carbon Attributes',
    tag: 'Specialized Track',
    badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
    hook: 'Every company wants to be seen as sustainable, but wanting it and proving it are two very different things. This course teaches how carbon credits and I-RECs separate a company that can defend its sustainability claims from one that ends up in a headline it never saw coming.',
    description: [
      'Every company eventually says some version of "we\'re carbon neutral", and almost nobody outside the sustainability team knows what is actually behind that sentence. Is it real reduction, or a checkbook shortcut dressed up as a result?',
      'This course closes that gap through a single running scenario. You will follow ABC, a company that finishes its first full emissions inventory and immediately hits a wall: knowing the number doesn\'t lower it. From there ABC makes — and nearly makes — the mistakes most companies make on the way to a defensible climate strategy: treating carbon credits and I-RECs as interchangeable, jumping to offsetting before reducing, almost greenlighting a "carbon neutral" headline it couldn\'t back up, and nearly reusing a single credit across two different public claims.',
      'By the end you won\'t just know what a carbon credit is. You will know how to tell a legitimate one from a worthless piece of paper, why identical-sounding credits can trade ten times apart in price, and how to buy and retire one without creating a claim your own auditors won\'t accept.'
    ],
    duration: '4.5 to 6 Hours',
    modulesCount: 7,
    lessonsCount: 25,
    passMark: '80% Benchmark',
    level: 'Foundational to Practitioner',
    prerequisites: 'None. Scenario-based operational track.',
    assessment: '20 Comprehensive Questions (19 MCQ Checkpoints + 1 Applied Capstone)',
    frameworks: ['GHG Protocol (Scope 1, 2 & 3)', 'Verra VCS Standard', 'Gold Standard for Global Goals', 'I-TRACK Foundation', 'Evident (Xpansiv)', 'RE100 Technical Criteria', 'Article 6 Paris Agreement'],
    caseStudy: {
      title: 'The ABC Enterprise Climate Strategy Dilemma',
      situation: 'ABC completes its first full emissions inventory across Scopes 1, 2, and 3. The finance team suggests purchasing cheap unvetted offsets to declare the entire brand "carbon neutral" immediately.',
      failure: 'The sustainability lead halts the claim: buying offsets without physical reduction, confusing I-RECs with carbon credits, or failing to retire serial numbers on a public registry triggers severe greenwashing penalties.',
      rootCause: 'Lack of understanding that "carbon neutral" requires an unalterable sequence: Measure → Reduce → Replace → Compensate (Residuals Only) → Report.',
      takeaway: 'One credit = One claim. Credits and I-RECs exist strictly for residual unavoidable emissions, and public claims require irrevocable registry retirement.'
    },
    audience: [
      'Sustainability professionals and anyone newly responsible for a company\'s climate claims',
      'Procurement and finance teams signing off on credit or certificate purchases',
      'Operations managers whose day-to-day decisions feed corporate emissions numbers',
      'Business executives and board members defending public environmental claims',
      'Commerce, economics, and environmental policy students entering ESG careers',
      'Carbon credit and I-REC buyers, brokers, and market analysts'
    ],
    ilos: [
      'Sequence the 4 steps behind any credible climate claim (measure, monitor, offset, report) and differentiate carbon credits from I-RECs across Scopes 1, 2 and 3.',
      'Trace the 4-stage project journey (design, validation, verification, issuance) and the role of independent VVBs like Carbon Check.',
      'Distinguish reducing from offsetting, define hard-to-abate residual emissions, and evaluate claims against greenwashing.',
      'Identify key players in the carbon market ecosystem: standard registries, accredited VVBs, brokers, marketplaces (Hestiya), and corporate buyers.',
      'Explain the 4-stage lifecycle of an environmental credit (issuance, holding, trading, retirement) and why retirement prevents double-counting.',
      'Evaluate how project type (avoidance vs removal), location, co-benefits, vintage, and compliance status drive carbon credit pricing.',
      'Compare direct registry, broker, and marketplace procurement routes and execute a defensible, audit-grade purchase flow.'
    ],
    modules: [
      {
        order: 1,
        title: 'Knowing Our Decarbonisation Tools: Carbon Credits and I-RECs',
        lessons: 4,
        est: '45 mins',
        lessonList: [
          { id: 1, title: 'Measure, Monitor, Offset, Report', duration: '14 mins', hasQuiz: false },
          { id: 2, title: 'Carbon Credits vs I-RECs: Two Very Different Tools', duration: '15 mins', hasQuiz: false },
          { id: 3, title: 'Connecting Carbon Credits and I-RECs with Scope 1, 2 and 3', duration: '15 mins', hasQuiz: false },
          { id: 4, title: 'Why Carbon Markets Matter: Two Commodities, One Market Logic', duration: '15 mins', hasQuiz: false }
        ]
      },
      {
        order: 2,
        title: 'From Project to Credit: Validation, Verification and Issuance',
        lessons: 3,
        est: '45 mins',
        lessonList: [
          { id: 5, title: 'The Journey a Project Takes Before It Becomes a Credit', duration: '15 mins', hasQuiz: false },
          { id: 6, title: 'Meeting the VVBs: Who Actually Does the Checking', duration: '15 mins', hasQuiz: false },
          { id: 7, title: 'Meeting the Issuance Bodies: Verra, Gold Standard, I-TRACK, Evident', duration: '15 mins', hasQuiz: false }
        ]
      },
      {
        order: 3,
        title: 'Reducing and Offsetting',
        lessons: 4,
        est: '50 mins',
        lessonList: [
          { id: 8, title: 'Reducing Versus Offsetting: The Line ABC Almost Crossed', duration: '14 mins', hasQuiz: false },
          { id: 9, title: 'Small Process Changes That Add Up', duration: '14 mins', hasQuiz: false },
          { id: 10, title: 'Greenwashing: When Offsetting Becomes a Cover-Up', duration: '16 mins', hasQuiz: false },
          { id: 11, title: 'Residual Emissions: What is Actually Left to Offset', duration: '14 mins', hasQuiz: false }
        ]
      },
      {
        order: 4,
        title: 'The Rulebook and the Players Behind It',
        lessons: 3,
        est: '45 mins',
        lessonList: [
          { id: 12, title: 'Who Actually Sets the Rules? Compliance vs Voluntary', duration: '15 mins', hasQuiz: false },
          { id: 13, title: 'Methodology: The Rulebook a Project Has to Follow & Additionality', duration: '15 mins', hasQuiz: false },
          { id: 14, title: 'Meeting the Other Players: Where Does a Platform Fit?', duration: '15 mins', hasQuiz: false }
        ]
      },
      {
        order: 5,
        title: 'Used Once, Counted Once: The Life of a Credit',
        lessons: 3,
        est: '45 mins',
        lessonList: [
          { id: 15, title: 'The Cradle-to-Grave Journey of a Credit', duration: '16 mins', hasQuiz: false },
          { id: 16, title: 'Why Registry Choice Still Matters After the Purchase', duration: '14 mins', hasQuiz: false },
          { id: 17, title: 'Retirement: The Step That Actually Prevents Double-Counting', duration: '15 mins', hasQuiz: false }
        ]
      },
      {
        order: 6,
        title: 'How a Credit Gets Its Price',
        lessons: 4,
        est: '50 mins',
        lessonList: [
          { id: 18, title: 'What Actually Moves the Price (Removals, Location, Co-benefits, Vintage)', duration: '15 mins', hasQuiz: false },
          { id: 19, title: 'RE100 and Why I-REC Demand Keeps Rising', duration: '15 mins', hasQuiz: false },
          { id: 20, title: 'Why "One Tonne of CO2" Isn\'t One Price', duration: '14 mins', hasQuiz: false },
          { id: 21, title: 'Compliance Versus Voluntary: How the Rulebook Shapes the Price', duration: '15 mins', hasQuiz: false }
        ]
      },
      {
        order: 7,
        title: 'How Companies Add These Certificates to Their Carts',
        lessons: 4,
        est: '45 mins',
        lessonList: [
          { id: 22, title: 'Registry, Broker or Marketplace: Picking Your Door In', duration: '15 mins', hasQuiz: false },
          { id: 23, title: 'The Actual Buying Journey: From Project to Retirement Certificate', duration: '14 mins', hasQuiz: false },
          { id: 24, title: 'Why Small Buyers Don\'t Go Straight to the Registry', duration: '14 mins', hasQuiz: false },
          { id: 25, title: 'Why a Platform Simplifies the Whole Journey', duration: '15 mins', hasQuiz: false }
        ]
      }
    ]
  }
};

export default function CourseLandingPage() {
  const routerParams = useParams();
  const rawSlug = (routerParams?.slug as string) || '';
  
  // Resolve slug or fallback to flagship
  const activeSlug = COURSES_DIRECTORY[rawSlug] 
    ? rawSlug 
    : (rawSlug === 'carbon-markets-irecs' ? 'carbon-markets-irec-fundamentals' : 'esg-basics-supply-chains');
  
  const course = COURSES_DIRECTORY[activeSlug] || COURSES_DIRECTORY['esg-basics-supply-chains'];

  // Advisor Modal State
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);

  const firstLessonId = course.modules[0]?.lessonList[0]?.id || 1;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#15803d] selection:text-white flex flex-col justify-between text-[#1F2937]">
      
      {/* 1. Universal Top Header Navigation */}
      <Header />

      {/* 2. Hero Section */}
      <section className="bg-[#111827] text-white pt-16 pb-20 relative overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${course.badgeColor}`}>
                {course.tag}
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Verifiable Credential Included
              </span>
              <span className="text-xs text-stone-400 font-mono">
                Code: {course.slug}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight font-serif">
              {course.title}
            </h1>

            <p className="text-lg sm:text-xl text-stone-300 leading-relaxed font-light max-w-3xl">
              {course.hook}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-stone-300 text-sm border-t border-stone-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-white">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-white">{course.modulesCount} Modules ({course.lessonsCount} Lessons)</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-white">{course.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-white">{course.passMark}</span>
              </div>
            </div>

            {/* Framework Pills */}
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1">Audited Standards:</span>
              {course.frameworks.map((fw, idx) => (
                <span key={idx} className="text-xs font-medium text-stone-300 bg-stone-800/80 px-2.5 py-1 rounded-lg border border-stone-700">
                  {fw}
                </span>
              ))}
            </div>

          </div>

          {/* Quick Enrol Header Card for Mobile/Desktop */}
          <div className="lg:col-span-4 bg-stone-900/90 border border-stone-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-sm">
            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Self-Paced Professional Certification</div>
              <div className="text-2xl font-black text-white">Full Course Access</div>
              <p className="text-xs text-stone-400">Includes all {course.lessonsCount} forensic lessons, checkpoint quizzes, case study walk-throughs, and verified digital certificate.</p>
            </div>

            <div className="space-y-3">
              <Link
                href={`/register?course=${course.slug}`}
                className="w-full py-4 bg-[#15803d] hover:bg-[#166534] text-white rounded-2xl font-bold text-base shadow-lg shadow-emerald-900/50 flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                Enroll & Register Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={`/courses/${course.slug}/lesson/${firstLessonId}`}
                className="w-full py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-2xl font-semibold text-sm border border-stone-600 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" /> Preview Curriculum
              </Link>
            </div>

            <div className="text-center">
              <span className="text-xs text-stone-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Lifetime access & accredited certificate validation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Main Two-Column Layout */}
      <main className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-12 gap-12 w-full flex-1">
        
        {/* Left Column (Primary Content) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* About Track (High authority text) */}
          <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#15803d] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                About this course
              </h2>
            </div>

            <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed">
              {course.description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Real-World Case Study Breakdown */}
          <section className="bg-[#FAF8F5] border-2 border-amber-200/80 rounded-3xl p-8 sm:p-10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
              Forensic Case Analysis
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Applied Industry Case</span>
              <h3 className="text-2xl font-black text-stone-900 font-serif">
                {course.caseStudy.title}
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-xs">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Reported Situation</span>
                <p className="text-sm text-stone-700 leading-relaxed font-medium">{course.caseStudy.situation}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-rose-200 space-y-2 shadow-xs">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">Operational Failure Mode</span>
                <p className="text-sm text-stone-800 leading-relaxed font-medium">{course.caseStudy.failure}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-200 space-y-2 shadow-xs">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Root Cause Forensics</span>
                <p className="text-sm text-stone-700 leading-relaxed font-medium">{course.caseStudy.rootCause}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-200 space-y-2 shadow-xs">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Key Audit Takeaway</span>
                <p className="text-sm text-stone-800 leading-relaxed font-medium">{course.caseStudy.takeaway}</p>
              </div>
            </div>
          </section>

          {/* Intended Learning Outcomes (ILOs) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#15803d] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                What you will master
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {course.ilos.map((ilo, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-xs flex gap-4 items-start hover:border-emerald-300 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5" />
                  <p className="text-stone-800 font-medium text-sm sm:text-base leading-snug">
                    {ilo}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Complete Interactive Syllabus Accordion */}
          <section className="space-y-6 pt-4">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Detailed Curriculum</span>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                  Complete Course Syllabus
                </h2>
              </div>
              <span className="text-stone-700 font-medium text-xs sm:text-sm px-4 py-1.5 bg-[#F2EFE9] border border-[#E5E0D8] rounded-full">
                {course.modulesCount} Modules • {course.lessonsCount} Lessons • ~{course.duration}
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm divide-y divide-[#E5E0D8] overflow-hidden">
              {course.modules.map((mod) => (
                <details 
                  key={mod.order} 
                  open={mod.order === 1} 
                  className="group"
                >
                  <summary className="flex justify-between items-center p-6 sm:p-7 cursor-pointer hover:bg-stone-50/80 transition-colors list-none select-none">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#15803d]/10 text-[#15803d] flex items-center justify-center font-bold text-lg font-serif shrink-0">
                        0{mod.order}
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-900 text-lg sm:text-xl group-hover:text-[#15803d] transition-colors">
                          {mod.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-500 mt-1">
                          <span className="flex items-center gap-1.5 font-medium">
                            <PlayCircle className="w-3.5 h-3.5 text-stone-400" /> {mod.lessons} Lessons
                          </span>
                          <span className="w-1 h-1 rounded-full bg-stone-300" />
                          <span>~{mod.est}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center group-hover:bg-[#15803d] group-hover:text-white transition-all shadow-xs shrink-0">
                      <ChevronDown className="w-5 h-5 group-open:-rotate-180 transition-transform duration-300" />
                    </div>
                  </summary>

                  <div className="px-6 pb-6 pt-1 sm:pl-24 text-stone-600 bg-stone-50/50">
                    <div className="space-y-2.5">
                      {mod.lessonList.map((lesson, lIdx) => (
                        <Link
                          key={lesson.id}
                          href={`/courses/${course.slug}/lesson/${lesson.id}`}
                          className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-white hover:bg-emerald-50/60 hover:border-emerald-300 border border-[#E5E0D8] transition-all group/item shadow-2xs"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover/item:bg-[#15803d] group-hover/item:text-white transition-colors">
                              {mod.order}.{lIdx + 1}
                            </div>
                            <div>
                              <span className="font-bold text-stone-900 text-sm sm:text-base group-hover/item:text-[#15803d] transition-colors block">
                                {lesson.title}
                              </span>
                              <span className="text-xs text-stone-500 font-medium">
                                {lesson.duration} {lesson.hasQuiz && '• Quiz Included'}
                              </span>
                            </div>
                          </div>

                          <span className="text-xs font-bold text-[#15803d] group-hover/item:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0 pl-3">
                            View Lesson <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Certificate Credential Showcase Card */}
          <section className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white rounded-3xl p-8 sm:p-10 space-y-8 border border-stone-800 shadow-xl">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Official Qualification
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-serif">
                  Verifiable Digital Certificate
                </h3>
                <p className="text-stone-300 text-sm sm:text-base max-w-xl">
                  Upon achieving an 80%+ score on the comprehensive final assessment, your verifiable certificate is issued instantly to your student profile and logged on the Hestiya public registry.
                </p>
              </div>

              <div className="bg-stone-800/80 border border-stone-700 px-4 py-2 rounded-xl text-center">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Credential Format</span>
                <span className="text-sm font-bold text-emerald-400">Cryptographically Hashed</span>
              </div>
            </div>

            {/* Simulated Certificate Preview Box */}
            <div className="bg-[#FAF8F5] text-stone-900 rounded-2xl p-6 sm:p-8 border-4 border-amber-300/80 shadow-2xl relative overflow-hidden">
              <div className="border border-stone-300 p-6 rounded-xl space-y-4">
                
                <div className="flex justify-between items-center border-b border-stone-200 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#15803d] text-white flex items-center justify-center font-serif font-black text-base">
                      H
                    </div>
                    <span className="font-serif font-bold text-stone-900 text-lg">Hestiya University</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Certificate ID</span>
                    <span className="font-mono text-xs font-bold text-stone-800">HU-{course.slug.slice(0, 4).toUpperCase()}-9481-VERIFIED</span>
                  </div>
                </div>

                <div className="text-center py-4 space-y-2">
                  <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block">Certificate of Technical Competency</span>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-stone-950">Jane Doe, Lead Auditor</div>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    has successfully satisfied all rigorous curriculum requirements and passed the comprehensive assessment for
                  </p>
                  <div className="text-base sm:text-lg font-bold text-[#15803d] font-serif">
                    {course.title}
                  </div>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-stone-200 text-xs text-stone-500">
                  <div>
                    <span className="block font-serif italic text-stone-900 font-bold text-sm">Hestiya Academic Board</span>
                    <span>Accredited Curriculum Registrar</span>
                  </div>
                  <div className="w-16 h-16 bg-stone-900 text-white p-1 rounded-lg flex flex-col items-center justify-center text-[8px] font-mono text-center">
                    <div className="w-12 h-12 bg-white text-stone-950 p-0.5 rounded flex items-center justify-center text-[7px] font-bold">
                      [QR VERIFY]
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400 pt-2 border-t border-stone-800">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> Shareable directly to LinkedIn Licenses & Certifications
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> Instant verification lookup via QR code or student registry ID
              </span>
            </div>
          </section>

          {/* Academic & Audit Board */}
          <section className="bg-white p-8 rounded-3xl border border-[#E5E0D8] space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#15803d]">Instructional Leadership</span>
              <h3 className="text-2xl font-black text-stone-900 font-serif">
                Course Faculty & Lead Verifiers
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#15803d] flex items-center justify-center font-bold text-base font-serif">
                  SK
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base">Siddharth Kumar</h4>
                  <span className="text-xs text-[#15803d] font-semibold block">Lead Verifier, ISO 14064-3</span>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                    12+ years directing Scope 3 assurance and supply chain forensics across 400+ Asian manufacturing plants.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-base font-serif">
                  AM
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base">Arjun Menon</h4>
                  <span className="text-xs text-blue-800 font-semibold block">Renewable Energy Specialist</span>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                    Former power market desk analyst with deep transaction experience in I-REC registry redemptions and corporate PPAs.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Sticky Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            
            {/* Primary Action Card */}
            <div className="bg-white rounded-3xl border-2 border-[#15803d]/30 p-7 sm:p-8 space-y-6 shadow-lg shadow-emerald-950/5">
              <div className="space-y-2">
                <span className="px-3 py-1 bg-emerald-50 text-[#15803d] border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                  Enrolment Open
                </span>
                <h3 className="text-2xl font-black text-stone-900 font-serif">
                  Master This Curriculum
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Start immediately. Complete modules in your own time, take checkpoints, and verify your certification.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/register?course=${course.slug}`}
                  className="w-full py-4 bg-[#15803d] hover:bg-[#166534] text-white rounded-2xl font-bold text-base shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
                >
                  Enroll in Track & Register
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/courses/${course.slug}/lesson/${firstLessonId}`}
                  className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-2xl font-bold text-sm border border-stone-200 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-emerald-700" /> Preview First Lesson
                </Link>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-2.5 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#15803d] shrink-0" />
                  <span>Immediate access to all lessons & modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#15803d] shrink-0" />
                  <span>Downloadable audit templates & case files</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#15803d] shrink-0" />
                  <span>Permanent verified certificate on public registry</span>
                </div>
              </div>
            </div>

            {/* Track Specifications Spec Sheet */}
            <div className="bg-white p-7 rounded-3xl border border-[#E5E0D8] space-y-4 shadow-xs">
              <h4 className="font-bold text-stone-900 text-base font-serif border-b border-stone-100 pb-3">
                Course Specifications
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Estimated Duration</span>
                  <span className="font-bold text-stone-900">{course.duration}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Instructional Mode</span>
                  <span className="font-bold text-stone-900">Self-Paced Text & Visuals</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Modules / Lessons</span>
                  <span className="font-bold text-stone-900">{course.modulesCount} / {course.lessonsCount}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Passing Grade</span>
                  <span className="font-bold text-[#15803d]">{course.passMark}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Assessment Type</span>
                  <span className="font-bold text-stone-900 text-right">{course.assessment}</span>
                </div>

                <div className="flex justify-between items-center pt-1.5">
                  <span className="text-stone-500">Prerequisites</span>
                  <span className="font-medium text-stone-700">{course.prerequisites}</span>
                </div>
              </div>
            </div>

            {/* Target Audience Card */}
            <div className="bg-[#FAF8F5] p-7 rounded-3xl border border-[#E5E0D8] space-y-4">
              <h4 className="font-bold text-stone-900 text-base font-serif flex items-center gap-2">
                <Users className="w-4 h-4 text-[#15803d]" />
                Who Should Take This Course?
              </h4>

              <ul className="space-y-2.5 text-xs text-stone-700">
                {course.audience.map((aud, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803d] mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{aud}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise Cohort Card */}
            <div className="bg-[#111827] text-white p-7 rounded-3xl space-y-4">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">For Organizations</span>
              <h4 className="font-serif font-black text-lg">Training an ESG Team?</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Bulk licenses, LMS SCORM export packages, and private cohort workshops are available for manufacturing brands and audit firms.
              </p>
              <button
                onClick={() => setIsAdvisorModalOpen(true)}
                className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-bold border border-stone-700 transition-colors cursor-pointer"
              >
                Inquire About Corporate Teams
              </button>
            </div>

          </div>
        </div>

      </main>

      {/* Unified Education Advisor Modal */}
      <AdvisorModal 
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        defaultCourse={course.title}
        title="Talk to an Education Advisor"
        subtitle={`Connect with our faculty regarding ${course.title}, cohort pricing, or enterprise training.`}
      />

      {/* 6. Footer */}
      <Footer />

    </div>
  );
}
