'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Share2, 
  Check, 
  Copy, 
  FileText, 
  Building2, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  RefreshCw
} from 'lucide-react';

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

export default function UserCertificatesPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedSerial, setCopiedSerial] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hestiya_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        fetchCertificates(parsed.email, parsed.id);
      } else {
        fetchCertificates();
      }
    } catch (e) {
      console.error(e);
      fetchCertificates();
    }
  }, []);

  const fetchCertificates = async (email?: string, userId?: string) => {
    setLoading(true);
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
      console.error('Failed to fetch certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = (serial: string) => {
    const url = `${window.location.origin}/verify/${serial}`;
    navigator.clipboard.writeText(url);
    setCopiedSerial(serial);
    setTimeout(() => {
      setCopiedSerial(null);
    }, 2000);
  };

  const getLinkedInShareUrl = (cert: Certificate) => {
    const issueDate = new Date(cert.issuedAt);
    const year = issueDate.getFullYear();
    const month = issueDate.getMonth() + 1;
    const certUrl = typeof window !== 'undefined' ? `${window.location.origin}/verify/${cert.serial}` : '';
    
    const params = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: cert.courseTitle,
      organizationName: 'Hestiya University',
      issueYear: year.toString(),
      issueMonth: month.toString(),
      certUrl: certUrl,
      certId: cert.serial,
    });
    return `https://www.linkedin.com/profile/add?${params.toString()}`;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Official Credentials
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            My Earned Certificates
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Cryptographically verifiable credentials issued to your profile. Verified by global auditors and employers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchCertificates(user?.email, user?.id)}
            className="p-2.5 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-colors shadow-xs inline-flex items-center gap-1 text-xs font-semibold"
            title="Refresh certificates"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <Link
            href="/university"
            className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-sm transition-all transform active:scale-95 inline-flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Earn More Certifications</span>
          </Link>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wide">Total Issued</span>
            <Award className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-black text-gray-900">{certificates.length}</div>
          <p className="text-[11px] text-gray-400 mt-1">Verified on public register</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wide">Passing Standard</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700">80%+</div>
          <p className="text-[11px] text-gray-400 mt-1">Industry audit threshold</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wide">Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">Active & Valid</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Lifetime verification</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wide">Affiliation</span>
            <Building2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-lg font-bold text-gray-900 truncate">
            {user?.company || 'Independent'}
          </div>
          <p className="text-[11px] text-gray-400 mt-1 truncate">{user?.email || 'Student profile'}</p>
        </div>

      </div>

      {/* Main Certificates Content */}
      {loading ? (
        <div className="bg-white rounded-3xl p-16 border border-gray-100 text-center space-y-3 shadow-xs">
          <Award className="w-10 h-10 animate-pulse text-primary mx-auto" />
          <h4 className="font-bold text-gray-800 text-base">Retrieving your verified certificates...</h4>
          <p className="text-xs text-gray-400">Querying the tamper-proof central credential register.</p>
        </div>
      ) : certificates.length === 0 ? (
        
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border-2 border-dashed border-gray-200 text-center space-y-5 shadow-xs">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-xl font-extrabold text-gray-900">No Certificates Issued Yet</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              When you pass a course assessment (80%+ threshold) or your institution’s administrator uploads an official certificate, it will appear here with your verification serial.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/university/esg-basics-supply-chains"
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Continue Course Syllabus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/university"
              className="px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold transition-all"
            >
              Browse All Courses
            </Link>
          </div>
        </div>

      ) : (

        /* Certificate Cards Grid */
        <div className="space-y-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="h-2 bg-gradient-to-r from-emerald-600 via-primary to-amber-400" />

              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Certificate Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{cert.status || 'Verified Active'}</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-800 bg-gray-100 border border-gray-200 px-3 py-1 rounded-lg">
                      {cert.serial}
                    </span>
                    {cert.score && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        Score: {cert.score}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    Issued on{' '}
                    {new Date(cert.issuedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Certificate Visual Body */}
                <div className="grid lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column: Course & Learner Information */}
                  <div className="lg:col-span-8 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      Hestiya University Credential
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                      {cert.courseTitle}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Awarded to <strong className="text-gray-950 font-bold">{cert.learnerName}</strong> for meeting all forensic auditing standards, Scope 3 greenhouse gas methodology, and compliance frameworks.
                    </p>

                    {user?.company && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50/70 border border-emerald-100 px-3 py-1 rounded-lg font-medium">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Corporate Sponsor: {user.company}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Visual Stamp Preview */}
                  <div className="lg:col-span-4 bg-gradient-to-br from-[#FAF8F5] to-emerald-50/30 p-5 rounded-2xl border border-gray-200 text-center space-y-3">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-amber-200 shadow-xs flex items-center justify-center mx-auto text-amber-500">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900 tracking-tight">Public Audit Proof</div>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">{cert.serial}</div>
                    </div>
                    <div className="pt-1">
                      <Link
                        href={`/verify/${cert.serial}`}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Public Ledger</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                </div>

                {/* Bottom Action Buttons Row */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Download PDF Button */}
                    {cert.fileUrl ? (
                      <a
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-sm transition-all transform active:scale-95 inline-flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Official Certificate</span>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="px-5 py-2.5 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold cursor-not-allowed inline-flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Digital Record Only</span>
                      </button>
                    )}

                    {/* Copy Public Verification Link */}
                    <button
                      onClick={() => handleCopyLink(cert.serial)}
                      className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                    >
                      {copiedSerial === cert.serial ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                          <span>Copy Verification Link</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Share on LinkedIn Button */}
                  <a
                    href={getLinkedInShareUrl(cert)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-[#0077B5] hover:bg-[#005f93] text-white rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 shrink-0"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Add to LinkedIn Profile</span>
                  </a>

                </div>

              </div>
            </div>
          ))}
        </div>

      )}

      {/* Security & Verification Explainer Box */}
      <div className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <Sparkles className="w-4 h-4 text-amber-500" /> Cryptographic Integrity Guarantee
        </div>
        <h4 className="text-lg font-extrabold text-stone-950">
          How Hestiya University Certificates are Verified
        </h4>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
          Unlike standard PDFs, every certificate issued is registered with a unique serial identifier (e.g. <code>HEST-2026-X89K2</code>) on our tamper-evident registry. Corporate auditors, customs authorities, and LinkedIn viewers can authenticate the credential’s validity and recipient name instantly without login friction.
        </p>
      </div>

    </div>
  );
}
