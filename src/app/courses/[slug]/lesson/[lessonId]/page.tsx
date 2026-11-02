'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Award,
  AlertTriangle,
  Info,
  Check,
  ListOrdered
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ESG_COURSE_DATA, CourseLesson } from '@/data/courses/esg-basics';
import { CARBON_COURSE_DATA } from '@/data/courses/carbon-markets';

export default function LessonDetailPage() {
  const routerParams = useParams();
  const router = useRouter();

  const rawSlug = (routerParams?.slug as string) || 'esg-basics-supply-chains';
  const rawLessonId = (routerParams?.lessonId as string) || '1';
  
  // Dynamically resolve course dataset based on slug
  const isCarbon = rawSlug.toLowerCase().includes('carbon');
  const activeCourse = isCarbon ? CARBON_COURSE_DATA : ESG_COURSE_DATA;
  const totalLessons = activeCourse.totalLessons;

  const parsedId = parseInt(rawLessonId, 10);
  const currentLessonId = isNaN(parsedId) || parsedId < 1 ? 1 : Math.min(parsedId, totalLessons);

  // Flatten all lessons from active course
  const allLessons: CourseLesson[] = activeCourse.modules.flatMap(m => m.lessons);
  const currentLesson = allLessons.find(l => l.id === currentLessonId) || allLessons[0];

  const [isSyllabusDrawerOpen, setIsSyllabusDrawerOpen] = useState(false);

  const prevLesson = currentLessonId > 1 ? allLessons.find(l => l.id === currentLessonId - 1) : null;
  const nextLesson = currentLessonId < totalLessons ? allLessons.find(l => l.id === currentLessonId + 1) : null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#15803d] selection:text-white flex flex-col justify-between text-[#1F2937]">
      
      {/* 1. Universal Header Navigation */}
      <Header />

      {/* 2. Top Sticky Lesson Progress Bar */}
      <div className="bg-white border-b border-[#E7E2D7] sticky top-20 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link 
              href={`/courses/${rawSlug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Syllabus
            </Link>

            <span className="text-stone-300">|</span>

            {/* Quick Lesson Navigator Button */}
            <button
              onClick={() => setIsSyllabusDrawerOpen(!isSyllabusDrawerOpen)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Lesson {currentLesson.ref} ({currentLesson.id}/{totalLessons})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSyllabusDrawerOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-medium text-stone-500">
            <span>Module {currentLesson.moduleOrder} of 7</span>
            <div className="w-24 sm:w-32 bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
              <div 
                className="bg-emerald-700 h-full rounded-full transition-all duration-300" 
                style={{ width: `${(currentLesson.id / totalLessons) * 100}%` }} 
              />
            </div>
            <span className="font-mono font-bold text-stone-700">{Math.round((currentLesson.id / totalLessons) * 100)}%</span>
          </div>

        </div>

        {/* Lesson Switcher Dropdown Drawer */}
        {isSyllabusDrawerOpen && (
          <div className="bg-[#FAF8F5] border-b border-[#E7E2D7] px-4 sm:px-6 py-4 max-h-96 overflow-y-auto animate-in fade-in duration-150">
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Jump to any Lesson</span>
                <span className="text-xs text-stone-400">Total: 7 Modules • {totalLessons} Lessons</span>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {allLessons.map((l) => {
                  const isActive = l.id === currentLesson.id;
                  return (
                    <Link
                      key={l.id}
                      href={`/courses/${rawSlug}/lesson/${l.id}`}
                      onClick={() => setIsSyllabusDrawerOpen(false)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        isActive
                          ? 'bg-emerald-700 text-white border-emerald-800 font-bold shadow-xs'
                          : 'bg-white text-stone-700 hover:bg-emerald-50 border-stone-200 font-medium'
                      }`}
                    >
                      <div className="text-[10px] opacity-80 mb-0.5">Lesson {l.ref}</div>
                      <div className="truncate font-semibold">{l.title}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Main Lesson Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 flex-1 w-full">
        
        {/* Lesson Header Card */}
        <div className="space-y-4 border-b border-[#E7E2D7] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Module {currentLesson.moduleOrder}: {currentLesson.moduleTitle}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 tracking-tight font-serif leading-tight">
            Lesson {currentLesson.ref} — {currentLesson.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-stone-500 pt-1">
            <span className="flex items-center gap-1.5 text-stone-700">
              <Clock className="w-4 h-4 text-emerald-700" /> {currentLesson.duration}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-stone-700">
              <BookOpen className="w-4 h-4 text-emerald-700" /> Lesson {currentLesson.id} of {totalLessons}
            </span>
            <span>•</span>
            <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md font-semibold">
              Official Master Copy
            </span>
          </div>

          {/* One-Line Hook Card */}
          <div className="p-6 sm:p-7 bg-[#111827] rounded-3xl text-white mt-6 shadow-md border border-stone-800">
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <p className="text-base sm:text-lg font-light leading-relaxed text-stone-200 italic font-serif">
                "{currentLesson.hook}"
              </p>
            </div>
          </div>
        </div>

        {/* Written Article Body */}
        <article className="space-y-8 text-stone-800 text-base sm:text-lg leading-relaxed font-normal">
          
          {/* Main Content Paragraphs */}
          <div className="space-y-4">
            {currentLesson.content.map((paragraph, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Subsections */}
          {currentLesson.subsections && currentLesson.subsections.map((sub, sIdx) => (
            <section key={sIdx} className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-serif tracking-tight">
                {sub.heading}
              </h2>
              
              <div className="space-y-3.5">
                {sub.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {sub.callout && (
                <div className={`p-5 sm:p-6 rounded-2xl border my-4 space-y-1.5 ${
                  sub.callout.type === 'warning'
                    ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                    : sub.callout.type === 'context'
                    ? 'bg-blue-50/80 border-blue-200 text-blue-950'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {sub.callout.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    ) : (
                      <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                    )}
                    <span>{sub.callout.title}</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed whitespace-pre-line">
                    {sub.callout.text}
                  </p>
                </div>
              )}
            </section>
          ))}

          {/* Applied Case Study Box (if present in lesson) */}
          {currentLesson.caseStudy && (
            <section className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-200 shadow-sm space-y-4 my-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                <ShieldCheck className="w-4 h-4 text-emerald-700" /> Forensic Applied Case Study
              </div>
              <h3 className="text-2xl font-bold text-stone-950 font-serif">
                {currentLesson.caseStudy.title}
              </h3>
              
              {currentLesson.caseStudy.situation && (
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">The Operational Situation:</span>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">{currentLesson.caseStudy.situation}</p>
                </div>
              )}

              {currentLesson.caseStudy.breakdown && (
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">Investigative Finding:</span>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">{currentLesson.caseStudy.breakdown}</p>
                </div>
              )}

              {currentLesson.caseStudy.resolution && (
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">Regulatory Outcome:</span>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">{currentLesson.caseStudy.resolution}</p>
                </div>
              )}

              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block mb-1">Key Strategic Lesson:</span>
                <p className="text-sm text-emerald-950 font-medium leading-relaxed italic">
                  "{currentLesson.caseStudy.lesson}"
                </p>
              </div>
            </section>
          )}

          {/* Key Takeaways Card */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#E7E2D7] space-y-4 mt-8">
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              Lesson {currentLesson.ref} Core Takeaways
            </h3>
            <ul className="space-y-2.5">
              {currentLesson.takeaways.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-3 text-sm sm:text-base text-stone-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <span className="leading-snug">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cited References */}
          {currentLesson.referenceIds && currentLesson.referenceIds.length > 0 && (
            <div className="pt-6 border-t border-stone-200 space-y-2 text-xs text-stone-500">
              <span className="font-bold uppercase tracking-wider text-stone-600 block">Verified References for this Lesson:</span>
              <ul className="space-y-1.5 font-mono text-[11px]">
                {currentLesson.referenceIds.map(refId => {
                  const ref = activeCourse.references[refId];
                  if (!ref) return null;
                  return (
                    <li key={refId} className="flex items-start gap-2">
                      <span className="font-bold text-stone-700">[{refId}]</span>
                      <span>{ref.text}</span>
                      {ref.url && (
                        <a 
                          href={ref.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-emerald-700 hover:underline inline-flex items-center gap-0.5 shrink-0 ml-1"
                        >
                          <span>link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

        </article>

        {/* 4. Bottom Previous / Next / Final Exam Action Bar */}
        <div className="pt-8 border-t-2 border-[#E7E2D7] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {prevLesson ? (
            <Link
              href={`/courses/${rawSlug}/lesson/${prevLesson.id}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: Lesson {prevLesson.ref}</span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextLesson ? (
            <Link
              href={`/courses/${rawSlug}/lesson/${nextLesson.id}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-md shadow-emerald-950/10 transition-all inline-flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Next: Lesson {nextLesson.ref} — {nextLesson.title}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            /* ================================================================ */
            /* FINAL LESSON REACHED: UNLOCK FINAL EXAM CTA                      */
            /* ================================================================ */
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              <Link
                href={`/courses/${rawSlug}/exam`}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-stone-950 text-base font-extrabold shadow-lg transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Award className="w-5 h-5 text-stone-950" />
                <span>Take Final Certification Exam</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}

        </div>

      </main>

      {/* 5. Footer */}
      <Footer />

    </div>
  );
}