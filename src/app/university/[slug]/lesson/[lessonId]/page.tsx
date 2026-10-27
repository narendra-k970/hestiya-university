'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  BookOpen, 
  Clock, 
  Award, 
  Sparkles, 
  ChevronRight, 
  RotateCcw,
  AlertTriangle,
  ShieldCheck,
  Factory,
  Droplets,
  Users,
  FileText,
  FileCheck,
  Check
} from 'lucide-react';
import Footer from '@/components/Footer';

export default function LessonDetailPage({ 
  params 
}: { 
  params?: { slug?: string; lessonId?: string } 
}) {
  const routerParams = useParams();
  const rawSlug = (routerParams?.slug as string) || params?.slug;
  const rawLessonId = (routerParams?.lessonId as string) || params?.lessonId;
  
  // Clean params to ensure undefined never appears in links or state
  const slug = (!rawSlug || rawSlug === 'undefined') ? 'esg-basics-supply-chains' : rawSlug;
  const lessonId = (!rawLessonId || rawLessonId === 'undefined') ? '2' : rawLessonId;

  // Multi-step Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Lesson Database with comprehensive, production-grade content
  const lessonData: { [key: string]: any } = {
    '2': {
      id: 2,
      moduleOrder: 1,
      moduleTitle: "ESG Fundamentals in Global Manufacturing",
      title: "The Three Pillars: E, S, and G Defined",
      readTime: "18 min read",
      type: "Framework & Applied Operational Case",
      hook: "In financial accounting, numbers consolidate onto a single balance sheet. In sustainability, E, S, and G operate on completely different laws of physics, human labor dynamics, and regulatory liability. Treating them as a single blended score is the fastest way to overlook catastrophic supply chain risk.",
      summary: "This comprehensive lesson deconstructs Environmental, Social, and Governance criteria inside industrial supply chains. You will learn how chemical effluent, forced overtime, and fraudulent bookkeeping operate beneath the surface of clean corporate audits.",
      
      pillars: [
        {
          name: "Environmental (E)",
          tagline: "Resource Depletion, Toxic Discharge & Carbon Footprint",
          icon: Droplets,
          color: "emerald",
          coreTopics: [
            {
              title: "Scope 1, 2, and 3 GHG Protocol Reality",
              desc: "In fashion and consumer goods manufacturing, between 80% to 92% of total greenhouse gas emissions sit in Scope 3 upstream operations (raw fiber agriculture, chemical synthesis, spinning mills, and wet dyeing). Scope 1 and 2 (corporate offices and company transport) make up less than 10% of total climate impact."
            },
            {
              title: "Wet Processing & Water Depletion",
              desc: "Textile dyeing and finishing processes consume an estimated 100 to 150 liters of fresh water per single kilogram of processed fabric. Dye facilities frequently over-extract regional groundwater, depriving surrounding farming communities of clean drinking water."
            },
            {
              title: "ZDHC & Chemical Management (MRSL vs PRSL)",
              desc: "Under the Zero Discharge of Hazardous Chemicals (ZDHC) framework, a garment can test clean on consumer retail racks (PRSL compliant) while toxic, carcinogenic chemicals (such as banned APEOs, heavy metals, or PFAS) were illegally dumped during factory wet-processing (MRSL violation)."
            }
          ]
        },
        {
          name: "Social (S)",
          tagline: "Human Labor, Occupational Health & Fair Living Wages",
          icon: Users,
          color: "blue",
          coreTopics: [
            {
              title: "The Five ILO Fundamental Principles at Work",
              desc: "International Labour Organization (ILO) core conventions mandate: (1) Freedom of association and collective bargaining, (2) Elimination of forced or bonded labor, (3) Abolition of child labor, (4) Elimination of discrimination in employment, and (5) Safe and healthy working environments."
            },
            {
              title: "The Piece-Rate Trap & Excessive Overtime",
              desc: "Suppliers under heavy cost compression often set unattainable hourly quotas (e.g., 120 sleeve attachments per hour). When workers fail to reach quotas during normal hours, they are forced into unrecorded, unpaid overtime shifts stretching past 70+ hours weekly."
            },
            {
              title: "Gender Vulnerability & Factory Safety",
              desc: "Over 70% of assembly-line garment operators worldwide are women, while supervisory and plant manager tiers remain predominantly male. Without independent grievance mechanisms, female workers face extreme risks of harassment, wage penalties, and dismissal upon pregnancy."
            }
          ]
        },
        {
          name: "Governance (G)",
          tagline: "Oversight, Anti-Fraud Systems, and Supply Chain Integrity",
          icon: ShieldCheck,
          color: "purple",
          coreTopics: [
            {
              title: "The 'Double Bookkeeping' Epidemic",
              desc: "To pass scheduled corporate social audits, supplier facilities routinely maintain two sets of digital records: a sanitized set showing legal 48-hour work weeks for international auditors, and a secret operational ledger recording true 75-hour shifts and delayed overtime wages."
            },
            {
              title: "Unauthorized Shadow Subcontracting",
              desc: "When brand buyers demand steep volume spikes with compressed delivery windows, primary approved Tier-1 suppliers secretly outsource production orders to uninspected, uncertified shadow workshops with zero fire exits, zero ventilation, and locked doors."
            },
            {
              title: "Whistleblower Channels & Executive Accountability",
              desc: "True governance requires non-retaliatory, third-party managed digital whistleblowing channels that bypass factory floor supervisors and report directly to brand sustainability boards."
            }
          ]
        }
      ],

      regulations: [
        {
          name: "EU CSDDD (Due Diligence Directive)",
          scope: "Corporate Sustainability Due Diligence",
          impact: "Mandates that large multinational enterprises identify, prevent, and actively mitigate environmental and human rights harms across their entire upstream and downstream value chain."
        },
        {
          name: "German Supply Chain Act (LkSG)",
          scope: "Mandatory Due Diligence Enforcement",
          impact: "Imposes severe fines of up to 2% of annual worldwide revenue and disbars companies from public procurement contracts if they fail to address verified human rights abuses in vendor facilities."
        },
        {
          name: "US UFLPA (Forced Labor Prevention)",
          scope: "Customs Import Enforcement",
          impact: "Creates a legal rebuttable presumption that all goods manufactured in whole or in part with raw cotton or polysilicon from designated high-risk regions involve forced labor, requiring forensic supply chain tracing."
        }
      ],

      caseStudy: {
        title: "Case Study Breakdown: The ABC Brand Scandal",
        situation: "Brand ABC held a pristine 'AAA' sustainability rating on Wall Street, certified by third-party questionnaires and glossy ESG reports.",
        failure: "During an audit in South Asia, investigative reporters exposed that ABC's primary vendor was running three secret shifts per week at an unlicensed dye shed 14 kilometers away. Untreated aniline dye sludge was being pumped directly into a municipal irrigation canal at midnight to save electricity on the Effluent Treatment Plant (ETP).",
        rootCause: "Commercial procurement teams at ABC had negotiated a 12% price reduction while cutting the product lead time from 90 days to 45 days. The Tier-1 factory could not legally meet the turnaround time without unauthorized subcontracting.",
        lesson: "Commercial buying practices are the primary driver of ESG risk. If purchasing departments negotiate prices below the cost of legal compliance, suppliers are structurally forced to cheat on Environmental and Social standards."
      },

      takeaways: [
        "A single blended ESG score hides critical vulnerabilities; evaluate E, S, and G independently.",
        "Over 80%+ of a brand's carbon footprint and labor risk sits in indirect Tier-2, Tier-3, and Tier-4 suppliers.",
        "ZDHC MRSL compliance during production is vastly more rigorous than PRSL testing on finished garments.",
        "Double bookkeeping and unauthorized subcontracting are intentional governance frauds born from procurement pressures.",
        "Modern laws (EU CSDDD, LkSG, UFLPA) eliminate plausible deniability and impose multi-million euro penalties for supplier failures."
      ]
    },
    '1': {
      id: 1,
      moduleOrder: 1,
      moduleTitle: "ESG Fundamentals in Global Manufacturing",
      title: "Introduction to ESG in Global Manufacturing",
      readTime: "14 min read",
      type: "Foundational Context & Supply Chain Architecture",
      hook: "For decades, supply chains ran on three numbers: cost, speed, and quality. Today, they run on a fourth: verifiability. A brand might employ a few thousand people directly, but rely on tens of thousands of workers across facilities it does not own. The gap between what a company controls and what it is responsible for is where ESG risk collects.",
      summary: "Understand how the transition to offshore contract manufacturing created unprecedented structural blind spots, and why financial accounting frameworks fail to capture systemic supply chain risks.",
      pillars: [],
      regulations: [],
      takeaways: [
        "Traditional supply chain metrics (cost, speed, quality) are incomplete without environmental and social verifiability.",
        "Offshore contract manufacturing kept balance sheets asset-light while shifting real risks outside corporate direct visibility.",
        "Auditors are moving from self-certification checklists to continuous, forensic data monitoring."
      ]
    }
  };

  const currentLesson = lessonData[lessonId] || lessonData['2'];

  // 5 In-depth Questions testing core understanding of Lesson 2
  const quizQuestions = [
    {
      id: 1,
      question: "Under the Greenhouse Gas (GHG) Protocol, why do Scope 3 emissions represent the primary environmental battleground for manufacturing brands?",
      options: [
        "Scope 3 is legally exempt from sustainability reporting in the European Union and North America.",
        "Scope 3 accounts for 80% to 92% of total emissions and occurs in upstream supplier tiers outside direct corporate ownership.",
        "Scope 3 measures only direct exhaust emissions from corporate executive vehicles and headquarter boiler heating.",
        "Scope 3 emissions are calculated solely by financial banks during initial public stock offerings."
      ],
      correctAnswer: 1,
      explanation: "In consumer goods and apparel supply chains, between 80% and 92% of lifecycle greenhouse gas emissions are generated in Scope 3 upstream operations (raw fiber cultivation, spinning, and wet dyeing)—facilities that brands contract with but do not own."
    },
    {
      id: 2,
      question: "What is the critical regulatory distinction between a Product Restricted Substances List (PRSL) and a Manufacturing Restricted Substances List (MRSL) under ZDHC guidelines?",
      options: [
        "PRSL applies only to cardboard packaging, while MRSL regulates worker uniforms.",
        "PRSL tests chemical concentrations in the finished garment sold to consumers, whereas MRSL bans hazardous chemical formulations during the entire manufacturing process to protect factory workers and waterways.",
        "MRSL is exclusively mandatory for electric vehicle manufacturers, while PRSL applies solely to food and beverage packaging.",
        "PRSL eliminates corporate liability for all Scope 3 carbon emissions, while MRSL is an internal financial ledger."
      ],
      correctAnswer: 1,
      explanation: "A finished shirt can pass consumer safety testing (PRSL compliant) while still having involved toxic, carcinogenic chemicals (such as banned alkylphenols or heavy metals) during factory wet-processing that were illegally discharged into community water sources (MRSL violation)."
    },
    {
      id: 3,
      question: "Which factory practice constitutes a catastrophic Governance (G) failure that completely invalidates Social (S) compliance audits?",
      options: [
        "Providing biometric fingerprint access for workers and transparent digital pay slips.",
        "Conducting quarterly fire evacuation drills in coordination with local municipal emergency responders.",
        "Operating 'Double Bookkeeping'—maintaining one falsified payroll/timecard log showing 48-hour weeks for Western auditors, while concealing real 70+ hour work weeks and unpaid overtime.",
        "Installing high-efficiency LED lighting and solar panels on the factory sewing floor."
      ],
      correctAnswer: 2,
      explanation: "Double bookkeeping is an intentional governance fraud where factory management maintains two distinct accounting systems—one falsified to deceive brand social auditors, and a secret true ledger masking severe overtime and minimum wage violations."
    },
    {
      id: 4,
      question: "Under modern legislation such as the EU Corporate Sustainability Due Diligence Directive (CSDDD) and the German Supply Chain Act (LkSG), how has corporate liability fundamentally transformed?",
      options: [
        "Brands are strictly liable only for permanent employees located within their home country's corporate headquarters.",
        "Companies face mandatory legal liability and severe financial fines (up to 2% of global annual turnover) for failing to identify, prevent, and remediate human rights and environmental violations across their upstream supplier network.",
        "Compliance is entirely voluntary and verified solely through self-certified marketing claims on brand websites.",
        "Brands can legally absolve themselves of all supplier liability by inserting a unilateral code-of-conduct disclaimer in purchasing contracts."
      ],
      correctAnswer: 1,
      explanation: "Modern due diligence laws like CSDDD and LkSG eliminate 'plausible deniability.' Companies cannot simply claim they were unaware of vendor abuses; they are legally mandated to conduct risk assessments, map supplier tiers, and remediate violations under penalty of heavy regulatory fines."
    },
    {
      id: 5,
      question: "What is 'Unauthorized Subcontracting,' and what commercial purchasing behavior is the primary root cause behind it?",
      options: [
        "When a certified supplier hires accredited third-party engineers to service factory steam boilers.",
        "When commercial brand buyers demand aggressive price discounts and shortened lead times, forcing approved Tier-1 suppliers to secretly farm out production to unregulated, un-audited shadow workshops.",
        "When a textile mill purchases certified organic cotton from international farming cooperatives without prior email notice.",
        "When factory management transitions from national electrical grids to on-site solar energy generation."
      ],
      correctAnswer: 1,
      explanation: "When commercial buyers push aggressive cost reductions and shortened production lead times, Tier-1 factories frequently accept orders beyond their manufacturing capacity and secretly farm out the excess work to unlicensed shadow facilities where child labor, wage theft, and locked fire exits collect."
    }
  ];

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCurrentAnswered = selectedAnswers[currentQuestion.id] !== undefined;

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    // Only record if not yet answered for this step
    if (selectedAnswers[questionId] !== undefined) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsQuizFinished(false);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-primary selection:text-white flex flex-col justify-between">
      
      {/* 1. Top Lesson Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm w-full">
        <div className="max-w-6xl mx-auto px-6 h-18 py-3.5 flex items-center justify-between gap-4">
          
          <Link 
            href={`/university/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-primary" /> Back to Syllabus
          </Link>

          <div className="flex items-center gap-3 text-sm font-semibold text-gray-600">
            <span>
              Module {currentLesson.moduleOrder} • Lesson {currentLesson.id} of 22
            </span>
            <div className="w-28 sm:w-36 bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-300" 
                style={{ width: `${(currentLesson.id / 22) * 100}%` }} 
              />
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Lesson Article Body */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-14 flex-1 w-full">
        
        {/* Lesson Header Card */}
        <div className="space-y-5 border-b border-gray-200 pb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Module {currentLesson.moduleOrder}: {currentLesson.moduleTitle}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {currentLesson.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base font-medium text-gray-600">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" /> {currentLesson.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-primary" /> {currentLesson.type}
            </span>
            <span>•</span>
            <span className="text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full font-bold text-xs sm:text-sm">
              5-Question Checkpoint Included
            </span>
          </div>

          {/* Core Concept Callout */}
          <div className="p-6 sm:p-8 bg-slate-900 rounded-3xl text-white mt-6 shadow-md border border-slate-800">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-primary/20 text-primary-light flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <p className="text-lg sm:text-xl font-light leading-relaxed text-slate-100 italic">
                "{currentLesson.hook}"
              </p>
            </div>
          </div>
        </div>

        {/* Lesson Written Body */}
        <div className="space-y-14 text-gray-800 leading-relaxed">

          {/* Intro Section */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <span className="text-primary font-black">01.</span> The Fallacy of the Blended ESG Score
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              <p>
                In corporate boardrooms, ESG is too frequently averaged into a composite index. A company proudly announces an "ESG Rating of 82/100" and assumes its operational vulnerabilities are mitigated.
              </p>
              <p>
                However, industrial manufacturing supply chains do not operate on mathematical averages. Environmental (E), Social (S), and Governance (G) represent three fundamentally distinct vectors of legal and physical risk:
              </p>
            </div>

            {/* Three Pillars Cards */}
            <div className="grid md:grid-cols-3 gap-6 pt-4">
              {currentLesson.pillars && currentLesson.pillars.map((pillar: any, pIdx: number) => {
                const Icon = pillar.icon;
                return (
                  <div 
                    key={pIdx} 
                    className="bg-white rounded-3xl p-7 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="space-y-5">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-gray-900">{pillar.name}</h3>
                        <p className="text-sm font-bold text-primary mt-1">{pillar.tagline}</p>
                      </div>
                      <div className="space-y-4 pt-2">
                        {pillar.coreTopics.map((topic: any, tIdx: number) => (
                          <div key={tIdx} className="space-y-1.5 border-t border-gray-100 pt-3">
                            <h4 className="text-base font-bold text-gray-900">{topic.title}</h4>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{topic.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Regulatory Section */}
          <section className="space-y-5 pt-6 border-t border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <span className="text-primary font-black">02.</span> The Regulatory Hammer: From Voluntary to Mandatory
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Until recently, corporate sustainability was managed primarily by marketing teams publishing glossy CSR booklets. Today, criminal and commercial law has intervened:
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-2">
              {currentLesson.regulations && currentLesson.regulations.map((reg: any, rIdx: number) => (
                <div key={rIdx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider">
                    {reg.scope}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl">{reg.name}</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{reg.impact}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Case Study Vignette */}
          {currentLesson.caseStudy && (
            <section className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-700">
                <AlertTriangle className="w-5 h-5" /> Real-World Investigation Breakdown
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {currentLesson.caseStudy.title}
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6 text-base">
                <div className="space-y-2 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <span className="font-bold text-gray-900 text-base block uppercase tracking-wide">The Wall Street Veneer:</span>
                  <p className="text-gray-700 leading-relaxed">{currentLesson.caseStudy.situation}</p>
                </div>
                <div className="space-y-2 bg-red-50/80 p-6 rounded-2xl border border-red-200">
                  <span className="font-bold text-red-950 text-base block uppercase tracking-wide">The Reality on the Ground:</span>
                  <p className="text-red-950 leading-relaxed">{currentLesson.caseStudy.failure}</p>
                </div>
              </div>

              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 space-y-2 text-sm sm:text-base leading-relaxed text-amber-950">
                <span className="font-bold block uppercase tracking-wider text-amber-900 text-sm">
                  Commercial Root Cause Analysis:
                </span>
                <p>{currentLesson.caseStudy.rootCause}</p>
                <p className="font-bold pt-2 text-amber-950">
                  Key Takeaway: {currentLesson.caseStudy.lesson}
                </p>
              </div>
            </section>
          )}

          {/* Key Takeaways Card */}
          <section className="bg-emerald-50/80 rounded-3xl border border-emerald-200 p-8 sm:p-10 space-y-5">
            <h3 className="text-2xl font-bold text-emerald-950 flex items-center gap-2.5">
              <CheckCircle2 className="w-6 h-6 text-primary" /> Key Takeaways for Auditors & Executives
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4 text-base sm:text-lg text-emerald-950 font-medium">
              {currentLesson.takeaways && currentLesson.takeaways.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* 3. Interactive Multi-Step Quiz (1 Question at a Time) */}
        <section className="bg-white rounded-[2.5rem] border border-gray-200 p-6 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-9 mt-16">
          
          {/* Quiz Top Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-1.5">
                <Award className="w-5 h-5" /> Lesson Knowledge Checkpoint
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Interactive Assessment: {currentLesson.title}
              </h2>
            </div>
            
            {/* Step Indicators */}
            {!isQuizFinished && (
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                {quizQuestions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentQuestionIndex;
                  const isCorrect = isAnswered && selectedAnswers[q.id] === q.correctAnswer;
                  
                  let dotStyle = "bg-gray-100 text-gray-500 border-gray-200";
                  if (isCurrent) {
                    dotStyle = "bg-primary text-white border-primary ring-4 ring-primary/20 scale-105";
                  } else if (isAnswered) {
                    dotStyle = isCorrect 
                      ? "bg-emerald-600 text-white border-emerald-600" 
                      : "bg-red-500 text-white border-red-500";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => isAnswered && setCurrentQuestionIndex(idx)}
                      disabled={!isAnswered && idx > currentQuestionIndex}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-sm font-bold flex items-center justify-center border transition-all ${dotStyle}`}
                      title={`Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stepper Progress Bar */}
          {!isQuizFinished && (
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm font-bold text-gray-600">
                <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                <span>{Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}% Progress</span>
              </div>
              <div className="w-full bg-gray-150 h-3 rounded-full overflow-hidden bg-gray-100">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQuestionIndex + (isCurrentAnswered ? 1 : 0)) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Question View: ONE QUESTION AT A TIME */}
          {!isQuizFinished ? (
            <div className="space-y-7 animate-in fade-in duration-200">
              
              <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-xs sm:text-sm font-extrabold text-primary uppercase tracking-widest block mb-2">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
                <p className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>

              {/* 4 Interactive Options */}
              <div className="space-y-3.5">
                {currentQuestion.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                  const isCorrect = optIdx === currentQuestion.correctAnswer;
                  
                  let optionCardStyle = "border-gray-200 bg-white hover:border-primary hover:bg-primary/5 text-gray-800 cursor-pointer shadow-sm";

                  if (isCurrentAnswered) {
                    if (isCorrect) {
                      optionCardStyle = "border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-500 cursor-default shadow-sm";
                    } else if (isSelected && !isCorrect) {
                      optionCardStyle = "border-red-500 bg-red-50 text-red-950 font-medium ring-2 ring-red-400 cursor-default shadow-sm";
                    } else {
                      optionCardStyle = "border-gray-200 bg-gray-50/50 text-gray-400 opacity-60 cursor-default";
                    }
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                      className={`p-5 rounded-2xl border text-base sm:text-lg flex items-center justify-between transition-all ${optionCardStyle}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-sm font-bold flex items-center justify-center shrink-0 border ${
                          isCurrentAnswered && isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : isCurrentAnswered && isSelected && !isCorrect
                            ? 'bg-red-500 text-white border-red-500'
                            : isSelected
                            ? 'bg-primary text-white border-primary'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug">{option}</span>
                      </div>

                      {isCurrentAnswered && isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 ml-3" />
                      )}
                      {isCurrentAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-6 h-6 text-red-500 shrink-0 ml-3" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Instant Explanation Feedback (Shown when attempted) */}
              {isCurrentAnswered && (
                <div className={`p-6 rounded-2xl text-base sm:text-lg leading-relaxed border animate-in slide-in-from-top-2 duration-200 ${
                  selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}>
                  <div className="flex items-center gap-2.5 font-bold mb-2">
                    {selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                        <span className="text-emerald-950 text-lg">Correct Answer! 🎯</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-5 h-5 text-amber-700" />
                        <span className="text-amber-950 text-lg">Pedagogical Insight 💡</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-800 leading-relaxed">{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Next Question Navigation Bar */}
              <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
                <button
                  onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(prev => prev - 1)}
                  disabled={currentQuestionIndex === 0}
                  className={`w-full sm:w-auto px-5 py-3 text-sm font-bold rounded-xl transition-colors text-center ${
                    currentQuestionIndex > 0 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer' 
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  ← Previous Question
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={!isCurrentAnswered}
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all shadow-md inline-flex items-center justify-center gap-2 ${
                    isCurrentAnswered
                      ? 'bg-primary hover:bg-primary-dark text-white shadow-primary/25 hover:-translate-y-0.5 cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <>Next Question <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <>View Final Results <Award className="w-5 h-5" /></>
                  )}
                </button>
              </div>

            </div>
          ) : (
            /* Quiz Completion Screen */
            <div className="text-center py-8 space-y-7 animate-in zoom-in-95 duration-300">
              <div className="w-24 h-24 rounded-full bg-emerald-100 text-primary flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <Award className="w-12 h-12" />
              </div>

              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-primary">
                  Checkpoint Completed
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Your Score: {score} out of {quizQuestions.length} ({percentage}%)
                </h3>
                <p className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto">
                  {percentage >= 80 
                    ? "Exceptional mastery! You demonstrated thorough understanding of the Three Pillars and industrial supply chain risk."
                    : "Good effort! We recommend reviewing the lesson highlights before advancing to Module 2."
                  }
                </p>
              </div>

              {/* Question Summary Breakdown */}
              <div className="max-w-2xl mx-auto text-left space-y-3.5 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Question Breakdown
                </h4>
                {quizQuestions.map((q, idx) => {
                  const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                  return (
                    <div 
                      key={q.id} 
                      className={`p-4 rounded-xl border text-sm sm:text-base flex items-center justify-between ${
                        isCorrect ? 'bg-emerald-50/70 border-emerald-200' : 'bg-red-50/70 border-red-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                          isCorrect ? 'bg-emerald-600' : 'bg-red-500'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-gray-900 line-clamp-1">
                          {q.question}
                        </span>
                      </div>
                      <span className={`font-bold shrink-0 pl-3 ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                        {isCorrect ? 'Correct' : 'Needs Review'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-sm font-bold transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Checkpoint
                </button>

                <Link
                  href={`/university/${slug}/lesson/${currentLesson.id + 1}`}
                  className="px-7 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold shadow-md shadow-primary/25 transition-all inline-flex items-center gap-2 hover:-translate-y-0.5"
                >
                  Next Lesson <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          )}

        </section>


      </main>

      {/* 5. Shared Footer */}
      <Footer />

    </div>
  );
}
