'use client';

import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, 
  Award, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Download, 
  ShieldCheck, 
  ExternalLink,
  FileText,
  Sparkles,
  Building2,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

interface Certificate {
  id: string;
  serial: string;
  learnerName: string;
  courseTitle: string;
  score: string | null;
  issuedAt: string;
  status: string;
  fileUrl: string | null;
  verificationSlug: string;
}

interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  company?: string | null;
}

export default function DashboardHome() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loadingCerts, setLoadingCerts] = useState(true);

  useEffect(() => {
    // 1. Get logged-in user from localStorage
    try {
      const stored = localStorage.getItem('hestiya_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        fetchUserCertificates(parsed.email, parsed.id);
      } else {
        fetchUserCertificates();
      }
    } catch (e) {
      console.error(e);
      fetchUserCertificates();
    }
  }, []);

  const fetchUserCertificates = async (email?: string, userId?: string) => {
    setLoadingCerts(true);
    try {
      const queryParams = new URLSearchParams();
      if (email) queryParams.set('email', email);
      if (userId) queryParams.set('userId', userId);

      const res = await fetch(`/api/student/certificates?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success && data.certificates) {
        setCertificates(data.certificates);
      }
    } catch (err) {
      console.error('Failed to load certificates:', err);
    } finally {
      setLoadingCerts(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Welcome Banner (Compact & Sleek) */}
      <div className="bg-primary text-white px-6 py-5 sm:px-8 sm:py-6 rounded-2xl shadow-md shadow-primary/15 flex items-center justify-between relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -right-10 -top-24 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight flex items-center gap-2">
            Welcome back, {user?.name || 'Learner'}! <span className="inline-block animate-wave text-xl sm:text-2xl">👋</span>
          </h2>
          <p className="text-primary-light text-xs sm:text-sm font-medium max-w-lg">
            {user?.company ? (
              <span className="inline-flex items-center gap-1 opacity-90">
                <Building2 className="w-3.5 h-3.5" /> Learning track for {user.company}
              </span>
            ) : (
              "You're making great progress. Continue exactly where you left off."
            )}
          </p>
        </div>
        <div className="hidden sm:block relative z-10 shrink-0 pl-4">
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-xs border border-white/20 shadow-md">
            <Award className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Active Courses & My Certificates (Takes 2/3 of space) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Course Card */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Continue Learning</h3>
            
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
              <div className="flex flex-col sm:flex-row gap-8">
                
                {/* Course Thumbnail */}
                <div className="w-full sm:w-56 h-40 rounded-2xl overflow-hidden relative shadow-inner shrink-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop')" }}
                  />
                </div>
                
                {/* Course Info */}
                <div className="flex-1 flex flex-col justify-center">
                  <div>
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 font-bold text-xs uppercase tracking-wider rounded-lg mb-3">
                      In Progress
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 leading-tight">
                      ESG Basics for Fashion & Manufacturing
                    </h4>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1 font-medium">
                      <span>Module 3: Carbon Credits</span>
                      <span className="font-bold text-primary">45%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                      <div className="bg-primary h-3 rounded-full relative" style={{ width: '45%' }}>
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-white/20 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm text-gray-500 flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4" /> Last active 2 days ago
                </span>
                <Link
                  href="/courses/esg-basics-supply-chains"
                  className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
                >
                  <PlayCircle className="w-5 h-5" /> Resume Course
                </Link>
              </div>
            </div>
          </div>

          {/* DEDICATED STUDENT CERTIFICATES SECTION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  My Earned Certificates
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
                    {certificates.length}
                  </span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Cryptographically verified certificates uploaded and issued by Hestiya University.
                </p>
              </div>
            </div>

            {loadingCerts ? (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 text-center text-gray-400">
                <Award className="w-8 h-8 animate-pulse text-primary mx-auto mb-2" />
                <p className="text-sm">Checking your verified credentials...</p>
              </div>
            ) : certificates.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-dashed border-gray-200 text-center space-y-3">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">No certificates issued yet</h4>
                  <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
                    Complete your coursework and achieve an 80%+ score on the assessment to earn your official certificate.
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-1"
                >
                  View Course Catalog <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                  >
                    {/* Top banner accent */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-primary to-amber-400" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                      
                      {/* Left info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> {cert.status || 'Verified Active'}
                          </span>
                          <span className="text-xs font-mono font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                            {cert.serial}
                          </span>
                        </div>

                        <h4 className="text-lg font-extrabold text-gray-900 leading-snug">
                          {cert.courseTitle}
                        </h4>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span>
                            Recipient: <strong className="text-gray-800">{cert.learnerName}</strong>
                          </span>
                          <span>•</span>
                          <span>
                            Score: <strong className="text-emerald-700 font-bold">{cert.score || 'Pass'}</strong>
                          </span>
                          <span>•</span>
                          <span>
                            Issued:{' '}
                            {new Date(cert.issuedAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Right Actions */}
                      <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                        {cert.fileUrl ? (
                          <a
                            href={cert.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            download
                            className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-sm transition-all inline-flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </a>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-2.5 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold cursor-not-allowed"
                          >
                            Digital Record
                          </button>
                        )}
                        <a
                          href={`/#credentials`}
                          className="px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Verify</span>
                        </a>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Explore More Placeholder */}
          <Link 
            href="/courses" 
            className="block bg-primary/5 border border-primary/20 rounded-[2rem] p-8 text-center hover:bg-primary/10 transition-colors border-dashed"
          >
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="text-lg font-bold text-gray-900 mb-1">Looking for more?</h4>
            <p className="text-gray-600 text-sm">Explore our course catalogue to start a new certification.</p>
          </Link>
          
        </div>

        {/* Right Column: Stats / Next Steps (Takes 1/3 of space) */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Your Stats</h3>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-center">
              <div className="text-4xl font-black text-gray-900 mb-2">1</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">In Progress</div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-center">
              <div className="text-4xl font-black text-primary mb-2">
                {certificates.length}
              </div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">Certificates</div>
            </div>
          </div>

          {/* Next Milestone Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-lg shadow-blue-900/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            
            <h4 className="font-bold text-xl mb-3 relative z-10">Next Milestone 🎯</h4>
            <p className="text-blue-100 text-sm leading-relaxed mb-6 relative z-10">
              Complete the Module 3 Assessment to unlock the next chapter on Labour Risks and earn your certificate.
            </p>
            <Link 
              href="/courses/esg-basics-supply-chains" 
              className="w-full py-3 bg-white text-blue-900 font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-md relative z-10 flex justify-center items-center gap-2"
            >
              Go to Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Student Profile Info Card */}
          {user?.company && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-[2rem] p-6 text-emerald-950">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                <Building2 className="w-4 h-4 text-emerald-700" /> Organization Account
              </div>
              <p className="text-sm font-semibold">{user.company}</p>
              <p className="text-xs text-emerald-700 mt-1">
                Your credentials are tied to your corporate email ({user.email}).
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
