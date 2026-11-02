'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Search, 
  Download, 
  ShieldCheck, 
  Trash2, 
  Loader2, 
  Building2,
  ExternalLink
} from 'lucide-react';

interface CertificateItem {
  id: string;
  serial: string;
  learnerName: string;
  courseTitle: string;
  score: string | null;
  issuedAt: string;
  status: string;
  fileUrl: string | null;
  verificationSlug: string;
  user?: {
    id: string;
    name: string;
    email: string;
    company: string | null;
  } | null;
}

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch issued certificates
  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/certificates');
      const data = await res.json();
      if (data.success && Array.isArray(data.certificates)) {
        setCertificates(data.certificates);
      }
    } catch (err) {
      console.error('Error fetching admin certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Handle Certificate Deletion
  const handleDelete = async (certId: string, certSerial: string) => {
    if (!window.confirm(`Are you sure you want to delete certificate ${certSerial}?`)) return;

    try {
      const res = await fetch(`/api/admin/certificates?id=${certId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setCertificates((prev) => prev.filter((c) => c.id !== certId));
      } else {
        alert(data.error || 'Failed to delete certificate');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting certificate');
    }
  };

  // Filtered certificates for main table
  const filteredCertificates = certificates.filter((cert) => {
    const q = searchTerm.toLowerCase();
    const student = (cert.learnerName || '').toLowerCase();
    const ser = (cert.serial || '').toLowerCase();
    const course = (cert.courseTitle || '').toLowerCase();
    const comp = (cert.user?.company || '').toLowerCase();
    return student.includes(q) || ser.includes(q) || course.includes(q) || comp.includes(q);
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Issued Certificates Registry</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Audit-grade record of learner certificates issued across all cohorts.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href="/admin/students"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Generate Certificate for Student</span>
          </Link>
          <span className="px-3.5 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl shadow-2xs">
            Total Issued: <strong className="text-gray-900 font-extrabold">{certificates.length}</strong>
          </span>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student, company, serial ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
          />
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
          <span className="px-3.5 py-1.5 bg-gray-100 rounded-xl text-gray-700 font-medium border border-gray-200">
            Total Issued: <strong className="text-gray-900 font-extrabold">{certificates.length}</strong>
          </span>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 min-w-[760px]">
            <thead className="bg-gray-50/75 text-xs uppercase font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-6">Certificate ID</th>
                <th className="py-3.5 px-4">Student & Company</th>
                <th className="py-3.5 px-4">Course</th>
                <th className="py-3.5 px-4">Score</th>
                <th className="py-3.5 px-4">Issued Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                    <span>Loading certificates...</span>
                  </td>
                </tr>
              ) : filteredCertificates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <Award className="w-10 h-10 mx-auto mb-2 text-gray-300 stroke-[1.5]" />
                    <p className="font-semibold text-gray-700">No certificates found</p>
                    <p className="text-xs text-gray-400 mt-1">
                      To issue a certificate when a student completes a course, go to the <Link href="/admin/students" className="text-emerald-700 font-bold hover:underline">Students Table</Link> and click &quot;Generate Certificate&quot; on any student row.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Certificate ID */}
                    <td className="py-4 px-6 font-mono text-xs font-bold text-gray-900">
                      <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 rounded text-gray-800">
                        {cert.serial}
                      </span>
                    </td>

                    {/* Student & Company */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-900">{cert.learnerName}</div>
                      {cert.user?.company ? (
                        <div className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5">
                          <Building2 className="w-3 h-3" /> {cert.user.company}
                        </div>
                      ) : (
                        <div className="text-[11px] text-gray-400">
                          {cert.user?.email || 'Individual Learner'}
                        </div>
                      )}
                    </td>

                    {/* Course Title */}
                    <td className="py-4 px-4 font-medium text-gray-700 text-xs max-w-xs truncate">
                      {cert.courseTitle}
                    </td>

                    {/* Score */}
                    <td className="py-4 px-4 font-bold text-emerald-600">
                      {cert.score || 'Pass'}
                    </td>

                    {/* Issued Date */}
                    <td className="py-4 px-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(cert.issuedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5" /> {cert.status || 'Valid'}
                      </span>
                    </td>

                    {/* Actions: Download, Public Verify, Delete */}
                    <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                      {cert.fileUrl ? (
                        <a
                          href={cert.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
                          title="Download certificate PDF"
                        >
                          <Download className="w-3 h-3" /> PDF
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No file</span>
                      )}
                      <Link
                        href={`/verify/${cert.serial}`}
                        target="_blank"
                        title="Public verification page"
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => handleDelete(cert.id, cert.serial)}
                        title="Delete certificate"
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
