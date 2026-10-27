import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, BookOpen, FileCheck, Target, ChevronDown, CheckCircle2, ShieldCheck, Users, PlayCircle, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';

export default async function CourseLandingPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || 'esg-basics-supply-chains';
  const course = {
    title: "ESG Basics for Fashion & Manufacturing Supply Chains",
    hook: "A company can look perfect on every financial document and still be sitting on a risk nobody was tracking. This course teaches you what that risk is, and where it is actually hiding.",
    description: [
      "For decades, supply chains ran on three numbers: cost, speed, and quality. Today, they run on a fourth: verifiability. A brand might employ a few thousand people directly, but rely on tens of thousands of workers across facilities it doesn't own. The gap between what a company controls and what it is responsible for is where ESG risk collects.",
      "This course walks you through that gap. You will learn how everyday operational decisions—a fabric switch, a shipping route, an unverified supplier—quietly build a carbon footprint and a labour risk that the balance sheet never sees.",
      "We will follow a single fictional company, ABC, from a clean financial audit through to a public sustainability scandal. By understanding exactly where ABC failed, you will learn how to spot, measure, and manage the same risks in your own supply chain, before an auditor or a regulator does."
    ],
    duration: "4.5 to 6 hours",
    modulesCount: 7,
    lessonsCount: 22,
    audience: [
      "Business executives and senior managers",
      "College and university students",
      "Senior school students",
      "Early-career professionals",
      "ESG stakeholders (investors, analysts, journalists, NGO staff, consultants)"
    ],
    ilos: [
      "Understand what E, S and G actually mean in the context of fashion and manufacturing supply chains.",
      "Identify where environmental and social risks hide in supplier tiers you do not directly control.",
      "Explain the difference between Scope 1, 2 and 3 emissions, and why Scope 3 is usually the largest.",
      "Understand the five ILO fundamental principles and how they map to supplier reality.",
      "Recognise how speed, volume and cost pressures create the conditions for ESG failures.",
      "Explain how the Three Lines Model closes the accountability gap."
    ],
    modules: [
      { 
        order: 1, 
        title: "ESG Fundamentals", 
        lessons: 3, 
        est: "45 mins",
        lessonList: [
          { id: 1, title: "Introduction to ESG in Global Manufacturing", duration: "12 mins", hasQuiz: true },
          { id: 2, title: "The Three Pillars: E, S, and G Defined", duration: "15 mins", hasQuiz: true },
          { id: 3, title: "Direct Control vs Scope 3 Liability", duration: "18 mins", hasQuiz: false }
        ]
      },
      { 
        order: 2, 
        title: "Where the Footprint is Actually Generated", 
        lessons: 3, 
        est: "50 mins",
        lessonList: [
          { id: 4, title: "Tier 1 vs Tier 4: Supply Chain Mapping", duration: "15 mins", hasQuiz: true },
          { id: 5, title: "Wet Processing & Textile Dyeing Realities", duration: "20 mins", hasQuiz: true },
          { id: 6, title: "Chemical Management (ZDHC Standards)", duration: "15 mins", hasQuiz: false }
        ]
      },
      { order: 3, title: "Carbon Credits and I-RECs", lessons: 4, est: "60 mins" },
      { order: 4, title: "People and Principles", lessons: 3, est: "45 mins" },
      { order: 5, title: "Real-Life Challenges", lessons: 3, est: "50 mins" },
      { order: 6, title: "From Papers to Peers", lessons: 3, est: "40 mins" },
      { order: 7, title: "Traces to Capital", lessons: 3, est: "40 mins" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-primary selection:text-white flex flex-col justify-between">
      
      {/* 1. Premium Hero Section with Gradient Fade */}
      <section 
        className="relative pt-32 pb-32 bg-cover bg-center w-full"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2500&auto=format&fit=crop')" }}
      >
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-50 w-full">
          <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
            <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
              <Image src="/images/logo.png" alt="Hestiya Logo" width={40} height={40} className="w-10 h-10 object-contain drop-shadow-md" priority />
              <span className="text-white">Hestiya<span className="text-primary-light font-medium">University</span></span>
            </Link>
            <div className="flex gap-4 items-center">
              <Link href="/login" className="text-sm font-bold text-white bg-primary hover:bg-primary-dark transition-all px-5 py-2.5 rounded-xl shadow-md shadow-primary/30">
                Sign In
              </Link>
            </div>
          </div>
        </nav>

        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/30" />
        
        <div className="relative max-w-6xl mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-sm font-semibold tracking-wide uppercase shadow-lg">
              <ShieldCheck className="w-4 h-4" /> Professional Certificate
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight drop-shadow-xl">
              {course.title}
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              {course.hook}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300 pt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-light" />
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-light" />
                <span className="font-medium">{course.modulesCount} Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-light" />
                <span className="font-medium">Self-Paced</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Sticky Sidebar */}
      <section className="max-w-6xl mx-auto px-6 pb-12 grid lg:grid-cols-12 gap-12 relative -mt-20 z-20 flex-1 w-full">
        
        {/* Left Content Area */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* About Course (Elevated Glass Card) */}
          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">About this course</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              {course.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* What you will learn (Grid Cards) */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              What you'll learn
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {course.ilos.map((ilo, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium leading-snug">{ilo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Syllabus */}
          <div className="space-y-6 pt-4">
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Syllabus</h2>
              <span className="text-gray-500 font-medium px-4 py-1 bg-gray-200/50 rounded-full">{course.lessonsCount} lessons total</span>
            </div>
            
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
              {course.modules.map((mod) => (
                <details key={mod.order} open={mod.order === 1} className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50/80 transition-colors list-none">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                        {mod.order}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
                          {mod.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1.5">
                          <span className="flex items-center gap-1.5"><PlayCircle className="w-4 h-4 text-gray-400"/> {mod.lessons} Lessons</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"/>
                          <span>~{mod.est}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <ChevronDown className="w-6 h-6 group-open:-rotate-180 transition-transform duration-300" />
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 pl-4 sm:pl-[5.5rem] text-gray-600">
                    {mod.lessonList ? (
                      <div className="space-y-2">
                        {mod.lessonList.map((lesson, lIdx) => (
                          <Link
                            key={lesson.id}
                            href={`/university/${slug}/lesson/${lesson.id}`}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50/90 hover:bg-primary/5 hover:border-primary/40 border border-gray-100 transition-all group/item"
                          >
                            <div className="flex items-center gap-3.5">
                              <div className="w-9 h-9 rounded-xl bg-white text-primary flex items-center justify-center font-bold text-sm shadow-sm border border-gray-200 shrink-0">
                                {mod.order}.{lIdx + 1}
                              </div>
                              <div>
                                <span className="font-bold text-gray-900 text-base group-hover/item:text-primary transition-colors block">
                                  {lesson.title}
                                </span>
                                <span className="text-sm text-gray-500 font-medium">
                                  {lesson.duration} {lesson.hasQuiz && '• Quiz Checkpoint included'}
                                </span>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-primary group-hover/item:translate-x-1 transition-transform inline-flex items-center gap-1.5 shrink-0 pl-3">
                              Start Lesson <ArrowRight className="w-4 h-4" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600">
                        Detailed lessons for Module {mod.order} will be fetched from database.
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar (Sticky) */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 space-y-6">
            
            {/* Primary CTA Card */}
            <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgb(0,0,0,0.08)] border border-gray-100 p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 ring-8 ring-primary/5">
                <FileCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Ready to start?</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">Join the course today, complete all modules, and earn your verified certificate.</p>
              
              <button className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/30 transition-all hover:-translate-y-1">
                Enrol Now
              </button>
            </div>

            {/* Quick Details */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">Course Details</h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-semibold text-gray-900">{course.duration}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Format</span>
                  <span className="font-semibold text-gray-900">Text & Slides</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Assessment</span>
                  <span className="font-semibold text-gray-900 text-right">19 MCQ<br/><span className="text-sm text-gray-400 font-normal">+ 1 Short Answer</span></span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Certificate</span>
                  <span className="font-bold text-primary text-right">Included</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500">Prerequisites</span>
                  <span className="font-semibold text-gray-900">None</span>
                </div>
              </div>
            </div>

            {/* Dark Audience Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[2rem] shadow-lg text-white">
              <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-light" />
                Who is this for?
              </h3>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="pb-4 border-b border-gray-700/50 text-gray-100 font-medium">
                  No prior background in sustainability is assumed.
                </li>
                {course.audience.map((aud, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-primary-light mt-1 text-xs">●</span> 
                    <span className="leading-snug">{aud}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </section>

      <Footer />

    </div>
  );
}
