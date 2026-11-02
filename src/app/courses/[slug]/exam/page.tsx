'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  AlertCircle, 
  ShieldCheck, 
  Loader2, 
  Flag, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Eye,
  FileCheck
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExamQuestionClient } from '@/data/courses/question-bank';

export default function CourseExamPage() {
  const routerParams = useParams();
  const router = useRouter();

  const slug = (routerParams?.slug as string) || 'esg-basics-supply-chains';
  const courseTitle = slug.includes('carbon')
    ? 'Carbon Markets & I-RECs Fundamentals'
    : 'ESG Basics for Fashion & Manufacturing Supply Chains';

  // Exam States: 'briefing' | 'active' | 'submitting' | 'results'
  const [examState, setExamState] = useState<'briefing' | 'active' | 'submitting' | 'results'>('briefing');

  // Candidate identity
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');

  // Questions and Session
  const [questions, setQuestions] = useState<ExamQuestionClient[]>([]);
  const [examSessionToken, setExamSessionToken] = useState<string | null>(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  // Active Exam Navigation State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const [flagged, setFlagged] = useState<{ [questionId: number]: boolean }>({});

  // Timer: 120 minutes (7200 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(120 * 60);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Results State
  const [evaluating, setEvaluating] = useState(false);
  const [examResult, setExamResult] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
    passingPercentage: number;
    passed: boolean;
    certificate?: {
      id: string;
      serial: string;
      verificationUrl: string;
      score: string;
      learnerName: string;
      courseTitle: string;
    };
    message: string;
  } | null>(null);

  // Read stored user from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hestiya_user');
      if (stored) {
        const u = JSON.parse(stored);
        if (u) {
          setCandidateName(u.name || '');
          setCandidateEmail(u.email || '');
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (examState !== 'active') return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time runs out
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState]);

  // Format Seconds to HH:MM:SS
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  // Start Exam: Calls /api/exam/start
  const handleStartExam = async () => {
    if (!candidateName.trim()) {
      setStartError('Please enter your full name as you wish it to appear on your certificate.');
      return;
    }

    setLoadingQuestions(true);
    setStartError(null);

    try {
      const res = await fetch('/api/exam/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseSlug: slug,
          questionCount: 100, // 100 questions per exam
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.questions) {
        throw new Error(data.error || 'Failed to start examination session.');
      }

      setQuestions(data.questions);
      setExamSessionToken(data.examSessionToken);
      setSecondsRemaining(120 * 60);
      setAnswers({});
      setFlagged({});
      setCurrentIndex(0);
      setExamState('active');

    } catch (err: unknown) {
      setStartError(err instanceof Error ? err.message : 'An error occurred while preparing your exam.');
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Record Answer
  const handleSelectOption = (questionId: number, optionKey: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  // Toggle Flag for Review
  const handleToggleFlag = (questionId: number) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Submit Exam: Calls /api/exam/submit
  const handleSubmitExam = async () => {
    setIsSubmitModalOpen(false);
    setExamState('submitting');
    setEvaluating(true);

    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examSessionToken,
          answers,
          courseSlug: slug,
          learnerName: candidateName,
          learnerEmail: candidateEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit examination.');
      }

      setExamResult(data);
      setExamState('results');

    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error evaluating examination. Please try again.');
      setExamState('active');
    } finally {
      setEvaluating(false);
    }
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#15803d] selection:text-white flex flex-col justify-between text-[#1F2937]">
      
      {/* 1. Header Navigation */}
      <Header />

      {/* ==================================================================== */}
      {/* SCREEN 1: PRE-EXAM BRIEFING & CANDIDATE REGISTRATION                 */}
      {/* ==================================================================== */}
      {examState === 'briefing' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Capstone Certification Assessment
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 font-serif tracking-tight">
              Final Examination Portal
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto">
              {courseTitle}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xl space-y-8">
            
            {/* Exam Rules & Specs Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Questions
                </span>
                <span className="text-2xl font-black text-stone-900 font-serif">100 MCQs</span>
                <span className="text-[10px] text-stone-500 block mt-0.5">Randomized sequence</span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Time Allowed
                </span>
                <span className="text-2xl font-black text-stone-900 font-serif">120 Mins</span>
                <span className="text-[10px] text-stone-500 block mt-0.5">2 Hours timed</span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Passing Cutoff
                </span>
                <span className="text-2xl font-black text-emerald-700 font-serif">80% Score</span>
                <span className="text-[10px] text-stone-500 block mt-0.5">80 of 100 correct</span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Credential
                </span>
                <span className="text-2xl font-black text-amber-700 font-serif">Instant</span>
                <span className="text-[10px] text-stone-500 block mt-0.5">Serial-coded cert</span>
              </div>
            </div>

            {/* Candidate Verification Form */}
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-950">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Verify Your Candidate Profile for Official Certificate Issuance</span>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Candidate Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Rachel Adams"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700"
                  />
                  <span className="text-[11px] text-stone-500 mt-0.5 block">
                    This exact name will be permanently registered on your blockchain/serial certificate.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Student Email Address
                  </label>
                  <input
                    type="email"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="rachel@company.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700"
                  />
                  <span className="text-[11px] text-stone-500 mt-0.5 block">
                    Used to record your exam attempt in your student portal dashboard.
                  </span>
                </div>
              </div>
            </div>

            {/* Security & Instructions Callout */}
            <div className="space-y-2 text-xs text-stone-600">
              <span className="font-bold text-stone-800 uppercase tracking-wider block">Important Examination Instructions:</span>
              <ul className="space-y-1.5 list-disc pl-5">
                <li>Every student receives a <strong>unique set of 100 questions</strong> dynamically drawn from our 500-question pool, with questions and answer options shuffled in random order.</li>
                <li>You can jump freely between questions using the Question Navigator palette on the right.</li>
                <li>Your selections auto-save instantly. If you accidentally reload your page, your exam progress is retained.</li>
                <li>Upon scoring 80% or above, your official cryptographically verifiable certificate is issued immediately.</li>
              </ul>
            </div>

            {startError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{startError}</span>
              </div>
            )}

            {/* Start Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
              <Link
                href={`/courses/${slug}`}
                className="text-xs font-bold text-stone-600 hover:text-stone-900 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Course Syllabus
              </Link>

              <button
                type="button"
                onClick={handleStartExam}
                disabled={loadingQuestions}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-950/20 transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-95"
              >
                {loadingQuestions ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Your Unique 100-Question Paper...
                  </>
                ) : (
                  <>
                    <span>Begin 100-Question Examination</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 2: ACTIVE 100-QUESTION TIMED EXAMINATION INTERFACE            */}
      {/* ==================================================================== */}
      {examState === 'active' && currentQ && (
        <div className="flex-1 flex flex-col w-full">
          
          {/* Sticky Top Bar: Timer, Progress & Quick Submit */}
          <div className="sticky top-20 z-30 bg-white border-b border-stone-200 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <span className="font-serif font-black text-sm sm:text-base text-stone-900 truncate">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-600 border border-stone-200">
                  Answered: {answeredCount}/{questions.length}
                </span>
              </div>

              {/* Timer Display */}
              <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm sm:text-base font-extrabold border ${
                secondsRemaining < 600
                  ? 'bg-red-50 text-red-700 border-red-300 animate-pulse'
                  : 'bg-stone-900 text-white border-stone-800'
              }`}>
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Submit Exam
              </button>

            </div>
          </div>

          {/* Main Exam Workspace: 2-Column (Question + Palette) */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Area: Current Question Card */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {currentQ.topic || 'Curriculum Competency'}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleFlag(currentQ.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                    flagged[currentQ.id]
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${flagged[currentQ.id] ? 'fill-amber-600 text-amber-600' : ''}`} />
                  <span>{flagged[currentQ.id] ? 'Flagged for Review' : 'Mark for Review'}</span>
                </button>
              </div>

              {/* Question Stem */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-400 font-mono">Q{currentIndex + 1}.</span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-950 font-serif leading-snug">
                  {currentQ.stem}
                </h2>
              </div>

              {/* 4 Radio Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.id] === opt.key;
                  return (
                    <button
                      type="button"
                      key={opt.key}
                      onClick={() => handleSelectOption(currentQ.id, opt.key)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20 text-emerald-950 font-semibold shadow-xs'
                          : 'border-stone-200 bg-stone-50/40 hover:bg-stone-50 hover:border-stone-300 text-stone-800'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 uppercase transition-colors ${
                        isSelected
                          ? 'bg-emerald-700 text-white'
                          : 'bg-white border border-stone-300 text-stone-600'
                      }`}>
                        {opt.key}
                      </span>
                      <span className="text-sm leading-relaxed pt-0.5">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Card Navigation */}
              <div className="pt-6 border-t border-stone-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed text-stone-800 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                <div className="text-xs text-stone-400 font-medium">
                  {answers[currentQ.id] ? 'Answer recorded' : 'Select an answer'}
                </div>

                <button
                  type="button"
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Area: 100-Question Palette Navigator */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-4">
              
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-stone-900 font-serif">Question Navigator</h3>
                <p className="text-[11px] text-stone-500">Jump to any question instantly</p>
              </div>

              {/* Status Legend */}
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold pb-2 border-b border-stone-100">
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-emerald-700 inline-block" /> Answered ({answeredCount})
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Flagged ({flaggedCount})
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-stone-100 border border-stone-300 inline-block" /> Unanswered ({unansweredCount})
                </span>
              </div>

              {/* 100 Question Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-1.5 max-h-[460px] overflow-y-auto p-1">
                {questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isFlagged = flagged[q.id];
                  const isCurrent = idx === currentIndex;

                  let btnStyle = 'bg-stone-50 text-stone-600 hover:bg-stone-100 border-stone-200';
                  if (isAnswered) {
                    btnStyle = 'bg-emerald-700 text-white border-emerald-800 font-bold';
                  }
                  if (isFlagged) {
                    btnStyle = 'bg-amber-400 text-stone-950 border-amber-500 font-extrabold ring-1 ring-amber-400';
                  }
                  if (isCurrent) {
                    btnStyle += ' ring-2 ring-emerald-500 ring-offset-1 font-black';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-xl border text-xs transition-all flex items-center justify-center cursor-pointer ${btnStyle}`}
                      title={`Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Review & Final Submit
                </button>
              </div>

            </div>

          </main>

        </div>
      )}

      {/* ==================================================================== */}
      {/* SUBMISSION CONFIRMATION MODAL                                        */}
      {/* ==================================================================== */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-center space-y-6">
            
            <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto">
              <HelpCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-stone-950 font-serif">Submit Examination?</h3>
              <p className="text-xs sm:text-sm text-stone-600">
                You are about to submit your examination for instant automated grading.
              </p>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-3 gap-2 bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-xs">
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-bold block">Answered</span>
                <span className="text-base font-extrabold text-emerald-700">{answeredCount}</span>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-bold block">Flagged</span>
                <span className="text-base font-extrabold text-amber-700">{flaggedCount}</span>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-bold block">Unanswered</span>
                <span className="text-base font-extrabold text-stone-700">{unansweredCount}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                Notice: You have <strong>{unansweredCount} unanswered questions</strong>. Unanswered questions receive 0 points.
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-1/2 py-3 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-bold transition-all cursor-pointer"
              >
                Continue Exam
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="w-1/2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Yes, Submit Now
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 3: EVALUATION LOADING                                         */}
      {/* ==================================================================== */}
      {examState === 'submitting' && (
        <main className="max-w-md mx-auto px-4 py-24 text-center space-y-4 my-auto">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-700 mx-auto" />
          <h2 className="text-2xl font-bold text-stone-950 font-serif">Evaluating Your 100 Answers...</h2>
          <p className="text-xs text-stone-500">
            Matching answers against the server-side audit key and computing your official passing score.
          </p>
        </main>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 4: FINAL RESULTS & CERTIFICATE CLAIM                          */}
      {/* ==================================================================== */}
      {examState === 'results' && examResult && (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8 animate-in zoom-in-95 duration-200">
          
          <div className="bg-white rounded-3xl border-2 border-emerald-300 p-8 sm:p-12 shadow-xl text-center space-y-8">
            
            {examResult.passed ? (
              /* PASSED STATE */
              <>
                <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-700 block">
                    Examination Passed • Credential Issued
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-serif">
                    Congratulations, {candidateName}!
                  </h1>
                  <p className="text-sm text-stone-600 max-w-lg mx-auto">
                    You have successfully passed the comprehensive examination for <br />
                    <strong className="text-stone-900 font-bold">{courseTitle}</strong>.
                  </p>
                </div>

                {/* Score Showcase */}
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto bg-stone-50 p-5 rounded-2xl border border-stone-200">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Your Score</span>
                    <span className="text-3xl font-black text-emerald-700 font-serif">{examResult.score}%</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Correct</span>
                    <span className="text-3xl font-black text-stone-900 font-serif">{examResult.correctCount}/100</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Required</span>
                    <span className="text-3xl font-black text-stone-500 font-serif">80%</span>
                  </div>
                </div>

                {/* Issued Certificate Details */}
                {examResult.certificate && (
                  <div className="p-6 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                        <Award className="w-4 h-4 text-emerald-700" />
                        <span>Official Registered Certificate</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900">
                        Status: Valid
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-emerald-200 font-mono text-xs space-y-1">
                      <div><span className="text-stone-400">Recipient:</span> <strong className="text-stone-900">{examResult.certificate.learnerName}</strong></div>
                      <div><span className="text-stone-400">Certificate Serial:</span> <strong className="text-emerald-800 font-bold">{examResult.certificate.serial}</strong></div>
                      <div><span className="text-stone-400">Score Recorded:</span> <strong className="text-stone-900">{examResult.certificate.score}</strong></div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <Link
                        href={examResult.certificate.verificationUrl}
                        className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>View Public Verifiable Credential</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href="/dashboard"
                        className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center cursor-pointer"
                      >
                        Go to Student Dashboard
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* FAILED / RETAKE STATE */
              <>
                <div className="w-20 h-20 bg-amber-100 text-amber-800 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                  <XCircle className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-800 block">
                    Passing Standard Not Reached
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-serif">
                    You Scored {examResult.score}%
                  </h1>
                  <p className="text-sm text-stone-600 max-w-lg mx-auto">
                    The passing cutoff is <strong>80% (80 correct answers)</strong>. You answered {examResult.correctCount} of 100 questions correctly.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 text-left space-y-1.5">
                  <p className="font-bold flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-700" /> What happens now:
                  </p>
                  <p>1. You can review the 22 course lessons and case studies.</p>
                  <p>2. You can retake the examination anytime without penalty.</p>
                  <p>3. Upon retaking, a <strong>fresh set of 100 randomized questions</strong> will be drawn from the pool.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleStartExam}
                    className="w-full sm:w-auto px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Exam (New Random Set)</span>
                  </button>

                  <Link
                    href={`/courses/${slug}`}
                    className="w-full sm:w-auto px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-sm font-bold transition-all inline-flex items-center justify-center cursor-pointer"
                  >
                    Review Course Lessons
                  </Link>
                </div>
              </>
            )}

          </div>

        </main>
      )}

      {/* 5. Footer */}
      <Footer />

    </div>
  );
}
