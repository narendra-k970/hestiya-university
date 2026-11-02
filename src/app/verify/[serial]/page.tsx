import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { 
  ShieldCheck, 
  Award, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  AlertCircle,
  ArrowLeft,
  FileText
} from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default async function CertificateVerificationPage({
  params,
}: {
  params: Promise<{ serial: string }>;
}) {
  const resolvedParams = await params;
  const serialQuery = decodeURIComponent(resolvedParams?.serial || '').trim();

  // Find certificate by serial or verificationSlug (case-insensitive)
  const certificate = await prisma.certificate.findFirst({
    where: {
      OR: [
        { serial: { equals: serialQuery, mode: 'insensitive' } },
        { verificationSlug: { equals: serialQuery, mode: 'insensitive' } },
      ],
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          company: true,
          email: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#F7F5F0] font-sans text-stone-900 flex flex-col justify-between selection:bg-amber-300">
      
      {/* Top Universal Header */}
      <Header />

      {/* Main Verification Card Area */}
      <main className="max-w-4xl mx-auto px-6 py-12 lg:py-16 w-full flex-1">
        
        {certificate ? (
          
          /* VERIFIED CERTIFICATE FOUND */
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Verification Status Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-emerald-950 text-sm sm:text-base">
                    Official Credential Verified & Valid
                  </h3>
                  <p className="text-xs text-emerald-700">
                    Registered with Hestiya University Central Certification Register.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white font-mono font-bold text-xs rounded-xl shadow-xs self-start sm:self-auto">
                {certificate.serial}
              </span>
            </div>

            {/* Certificate Presentation Document Box */}
            <div className="bg-white rounded-3xl border-4 border-double border-[#D5CFBF] p-8 sm:p-12 shadow-xl relative overflow-hidden">
              
              {/* Background watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-8 text-center">
                
                {/* Header Brand */}
                <div className="space-y-2">
                  <Image src="/images/logo.png" alt="Hestiya" width={48} height={48} className="w-12 h-12 object-contain mx-auto" />
                  <p className="text-xs font-black tracking-widest uppercase text-stone-500">
                    Hestiya University of Sustainability & Supply Chain Governance
                  </p>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-wide uppercase">
                    Certificate of Competence & Verification
                  </h2>
                </div>

                <div className="w-24 h-0.5 bg-amber-400 mx-auto" />

                {/* Recipient */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-widest">This certifies that</p>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 tracking-tight">
                    {certificate.learnerName}
                  </h1>
                  {certificate.user?.company && (
                    <p className="text-xs font-semibold text-emerald-800">
                      Affiliation: {certificate.user.company}
                    </p>
                  )}
                </div>

                {/* Course Details */}
                <div className="space-y-3 max-w-xl mx-auto">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    has successfully satisfied all rigorous curriculum requirements and demonstrated firm forensic proficiency in
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 leading-snug">
                    {certificate.courseTitle}
                  </h3>
                  {certificate.score && (
                    <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-extrabold">
                      Examination Score: {certificate.score}
                    </div>
                  )}
                </div>

                {/* Details Grid */}
                <div className="pt-6 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-600 font-medium">
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-bold">Serial ID</span>
                    <strong className="text-stone-900 font-mono">{certificate.serial}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-bold">Issue Date</span>
                    <strong className="text-stone-900">
                      {new Date(certificate.issuedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-bold">Status</span>
                    <strong className="text-emerald-700">Valid Active</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-bold">Issuer</span>
                    <strong className="text-stone-900">Hestiya Faculty</strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  {certificate.fileUrl ? (
                    <a
                      href={certificate.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-stone-950 font-bold rounded-xl text-xs shadow-md transition-all inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Official Certificate PDF</span>
                    </a>
                  ) : null}
                  <Link
                    href="/courses"
                    className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition-all inline-flex items-center gap-2"
                  >
                    <span>View Course Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>

          </div>

        ) : (

          /* CERTIFICATE NOT FOUND */
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-5 max-w-md mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-stone-900">Certificate Not Found</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                No certificate could be located for query <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono">{serialQuery}</code>. Please verify the serial number or contact support.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Homepage
            </Link>
          </div>

        )}

      </main>

      <Footer dark={false} />

    </div>
  );
}
