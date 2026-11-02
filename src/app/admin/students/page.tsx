'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  UserPlus, 
  CheckCircle2, 
  Clock, 
  Award, 
  Building2, 
  X, 
  Upload, 
  Loader2,
  FileText,
  AlertCircle,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  role?: string;
  course?: string;
  progress?: number;
  status?: string;
  createdAt?: string;
  certificates?: { id: string; serial: string; courseTitle: string }[];
}

const courseOptions = [
  'ESG Basics for Fashion & Manufacturing Supply Chains',
  'Carbon Markets & I-RECs Fundamentals',
];

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [students, setStudents] = useState<StudentRecord[]>([]);

  // Enrol Student Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    course: 'ESG Basics for Fashion & Manufacturing Supply Chains',
  });

  // Certificate Upload Modal State (In-place 1-click modal per student row)
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certStudent, setCertStudent] = useState<StudentRecord | null>(null);
  const [certCourse, setCertCourse] = useState('ESG Basics for Fashion & Manufacturing Supply Chains');
  const [certScore, setCertScore] = useState('95%');
  const [certSerial, setCertSerial] = useState('');
  const [certFile, setCertFile] = useState<File | null>(null);
  const [certUploading, setCertUploading] = useState(false);
  const [certError, setCertError] = useState<string | null>(null);
  const [certSuccess, setCertSuccess] = useState<string | null>(null);
  const [createdCertificate, setCreatedCertificate] = useState<{
    id: string;
    serial: string;
    courseTitle: string;
    score: string;
    learnerName: string;
    verificationSlug?: string;
  } | null>(null);
  const [copiedCertUrl, setCopiedCertUrl] = useState(false);

  const generateCertSerial = () => {
    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `HEST-${new Date().getFullYear()}-${randomCode}`;
  };

  // Open Certificate Upload Modal for a specific row student
  const handleOpenCertModal = (student: StudentRecord) => {
    setCertStudent(student);
    setCertCourse(student.course || 'ESG Basics for Fashion & Manufacturing Supply Chains');
    setCertScore('95%');
    setCertSerial(generateCertSerial());
    setCertFile(null);
    setCertError(null);
    setCertSuccess(null);
    setCreatedCertificate(null);
    setCopiedCertUrl(false);
    setIsCertModalOpen(true);
  };

  // Fetch real students from API
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/students');
      const data = await res.json();
      if (data.success && data.students) {
        setStudents(data.students);
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Enrol new student submit
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newStudent.name.trim(),
          email: newStudent.email.trim(),
          phone: newStudent.phone.trim() || null,
          company: newStudent.company.trim() || null,
          course: newStudent.course,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewStudent({
          name: '',
          email: '',
          phone: '',
          company: '',
          course: 'ESG Basics for Fashion & Manufacturing Supply Chains',
        });
        setIsModalOpen(false);
        fetchStudents();
      } else {
        alert(data.error || 'Failed to enrol student');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating student');
    } finally {
      setSubmitting(false);
    }
  };

  // Certificate upload submit
  const handleUploadCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certStudent) return;

    setCertUploading(true);
    setCertError(null);
    setCertSuccess(null);

    try {
      const formData = new FormData();
      formData.append('studentId', certStudent.id);
      formData.append('studentEmail', certStudent.email);
      formData.append('learnerName', certStudent.name);
      formData.append('courseTitle', certCourse);
      formData.append('score', certScore || '90%');
      formData.append('serial', certSerial || generateCertSerial());

      if (certFile) {
        formData.append('file', certFile);
      }

      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate certificate');
      }

      setCreatedCertificate(data.certificate);
      setCertSuccess('Official course certificate generated and registered successfully!');
      fetchStudents();
    } catch (err: unknown) {
      setCertError(err instanceof Error ? err.message : 'Error generating certificate');
    } finally {
      setCertUploading(false);
    }
  };

  const filteredStudents = students.filter((s) => {
    if (s.role === 'ADMIN' || s.role === 'admin') return false;
    const q = searchTerm.toLowerCase();
    const name = (s.name || '').toLowerCase();
    const email = (s.email || '').toLowerCase();
    const phone = (s.phone || '');
    const company = (s.company || '').toLowerCase();
    return name.includes(q) || email.includes(q) || phone.includes(q) || company.includes(q);
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header - Notice: Top "Upload Certificate" button removed as requested! */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Manage Students & Enrolments</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Track learner progress, manage company affiliations, and click <strong>&quot;Generate Certificate&quot;</strong> in any row to issue credentials upon course completion.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Enrol New Student
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Search & Actions Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, company, email..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">
              Total Students: <strong className="text-gray-900">{students.length}</strong>
            </span>
          </div>
        </div>

        {/* Students Table with 1-Click Upload Certificate in Every Row */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/75 text-[11px] font-black uppercase tracking-wider text-gray-400">
                <th className="py-3 px-6">Student</th>
                <th className="py-3 px-4">Company / Org</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Certificates</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                    <span>Loading student records...</span>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="font-semibold text-gray-700">No students found</p>
                    <p className="text-xs text-gray-400 mt-1">Try adjusting your search query.</p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-emerald-50/30 transition-colors">
                    
                    {/* Student Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.email}</div>
                          {student.course && (
                            <div className="mt-1">
                              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                                student.course.includes('Carbon')
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              }`}>
                                {student.course}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Company Column */}
                    <td className="py-4 px-4">
                      {student.company ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                          <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{student.company}</span>
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Individual</span>
                      )}
                    </td>

                    {/* Contact Phone */}
                    <td className="py-4 px-4 text-xs text-gray-600 font-medium">
                      {student.phone ? (
                        <span>{student.phone}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    {/* Certificates Count */}
                    <td className="py-4 px-4">
                      {student.certificates && student.certificates.length > 0 ? (
                        <Link 
                          href="/admin/certificates" 
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md hover:bg-emerald-100"
                        >
                          <Award className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{student.certificates.length} Issued</span>
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-400">0 Issued</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      {student.certificates && student.certificates.length > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3.5 h-3.5" /> In Progress
                        </span>
                      )}
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-4 text-xs font-medium text-gray-500 whitespace-nowrap">
                      {student.createdAt
                        ? new Date(student.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Recently'}
                    </td>

                    {/* Actions: Direct 1-Click Generate Certificate Button */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenCertModal(student)}
                        className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 active:scale-95 cursor-pointer"
                        title={`Generate certificate for ${student.name} upon course completion`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Generate Certificate</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* MODAL 1: ENROL NEW STUDENT MODAL                                       */}
      {/* ====================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-gray-100 animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto my-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-gray-900 text-lg">Enrol New Student</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 pt-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g. Rahul Gupta"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Company / Organization
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={newStudent.company}
                    onChange={(e) => setNewStudent({ ...newStudent, company: e.target.value })}
                    placeholder="e.g. EcoTextiles India Ltd, Arvind Mills..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Assign Course</label>
                <select
                  value={newStudent.course}
                  onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium"
                >
                  {courseOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg shadow-sm disabled:opacity-50 inline-flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save & Enrol</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* MODAL 2: IN-PLACE UPLOAD CERTIFICATE MODAL (AUTO-FILLED LEARNER)       */}
      {/* ====================================================================== */}
      {isCertModalOpen && certStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto" style={{ colorScheme: 'light' }}>
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in duration-200 max-h-[92vh] overflow-y-auto my-auto relative"
            style={{ color: '#0f172a', backgroundColor: '#ffffff', colorScheme: 'light' }}
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-950 text-base" style={{ color: '#020617' }}>
                    Generate Course Certificate
                  </h3>
                  <p className="text-xs text-slate-500 font-medium" style={{ color: '#64748b' }}>
                    Issue verified credential for learner upon course completion
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Alert */}
            {certError && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{certError}</span>
              </div>
            )}

            {createdCertificate ? (
              /* Success / Share View */
              <div className="space-y-4 pt-3 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-emerald-950 text-sm">
                        Certificate Registered in Database & Dashboard
                      </h4>
                      <p className="text-xs text-emerald-700 font-mono font-bold mt-0.5">
                        Serial: {createdCertificate.serial}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-emerald-950 bg-white/90 p-3 rounded-xl border border-emerald-200/70 space-y-1">
                    <p><strong>Learner:</strong> {certStudent.name} ({certStudent.email})</p>
                    <p><strong>Course:</strong> {createdCertificate.courseTitle}</p>
                    <p><strong>Score:</strong> {createdCertificate.score}</p>
                    <p className="text-emerald-700 font-semibold pt-1">
                      ✓ Visible in Student Dashboard & Admin Registry
                    </p>
                  </div>
                </div>

                {/* Public Link Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Public Verification Link (Share with Student)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={typeof window !== 'undefined' ? `${window.location.origin}/verify/${createdCertificate.serial}` : `/verify/${createdCertificate.serial}`}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700 select-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const url = `${window.location.origin}/verify/${createdCertificate.serial}`;
                        navigator.clipboard.writeText(url);
                        setCopiedCertUrl(true);
                        setTimeout(() => setCopiedCertUrl(false), 2000);
                      }}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 shrink-0 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedCertUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                      <span>{copiedCertUrl ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Email to Student CTA */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>Send Direct to Student</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Student can log in to their student portal (<strong className="text-primary">/dashboard/certificates</strong>) to view it anytime, or you can send an email with the verification link right now:
                  </p>
                  <a
                    href={`mailto:${certStudent.email}?subject=${encodeURIComponent(`Official Certificate of Completion: ${createdCertificate.courseTitle}`)}&body=${encodeURIComponent(
                      `Dear ${certStudent.name},\n\nCongratulations! Your official Certificate of Completion for "${createdCertificate.courseTitle}" has been verified and registered by Hestiya University Administration.\n\nExamination Score: ${createdCertificate.score}\nOfficial Serial ID: ${createdCertificate.serial}\n\nYou can access and verify your official credential online anytime via your public verification link:\n${typeof window !== 'undefined' ? window.location.origin : ''}/verify/${createdCertificate.serial}\n\nYou can also log into your Student Dashboard at ${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard/certificates to download your certificate PDF or share it to LinkedIn.\n\nWarm regards,\nHestiya University of Sustainability & Supply Chain Governance`
                    )}`}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" /> Send Email Notification to {certStudent.email}
                  </a>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <Link
                    href="/admin/certificates"
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View in Certificates Registry
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCertModalOpen(false);
                      setCreatedCertificate(null);
                    }}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUploadCertificate} className="space-y-4 pt-4">
                
                {/* Auto-filled Learner Card */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800" style={{ color: '#1e293b' }}>
                    Learner Recipient <span className="text-emerald-600 font-semibold">(Auto-filled from Table)</span>
                  </label>
                  
                  <div className="p-3.5 rounded-2xl border border-emerald-300 bg-emerald-50/80 flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                        {certStudent.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-black text-slate-950 text-sm truncate flex items-center gap-2" style={{ color: '#020617' }}>
                          <span className="truncate">{certStudent.name}</span>
                          {certStudent.company && (
                            <span className="text-[10px] font-bold text-emerald-950 bg-emerald-200/90 border border-emerald-300 px-2 py-0.5 rounded-md shrink-0 inline-flex items-center gap-1">
                              <Building2 className="w-2.5 h-2.5 text-emerald-800" />
                              <span className="max-w-[130px] truncate">{certStudent.company}</span>
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 truncate font-semibold mt-0.5" style={{ color: '#475569' }}>
                          {certStudent.email}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded-md shrink-0 border border-emerald-200">
                      Selected
                    </span>
                  </div>
                </div>

                {/* Course Title Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800" style={{ color: '#1e293b' }}>
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={certCourse}
                    onChange={(e) => setCertCourse(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-primary font-bold text-slate-900"
                    style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                  >
                    {courseOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Score & Serial Number Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1" style={{ color: '#1e293b' }}>
                      Assessment Score
                    </label>
                    <input
                      type="text"
                      value={certScore}
                      onChange={(e) => setCertScore(e.target.value)}
                      placeholder="e.g. 95%"
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary font-bold text-emerald-700 bg-white"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-800" style={{ color: '#1e293b' }}>
                        Certificate Serial
                      </label>
                      <button
                        type="button"
                        onClick={() => setCertSerial(generateCertSerial())}
                        className="text-[10px] text-primary hover:underline font-bold cursor-pointer"
                      >
                        Regenerate
                      </button>
                    </div>
                    <input
                      type="text"
                      value={certSerial}
                      onChange={(e) => setCertSerial(e.target.value)}
                      placeholder="HEST-2026-XXXXX"
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono font-bold text-slate-900 bg-white focus:outline-none focus:border-primary"
                      style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                    />
                  </div>
                </div>

                {/* File Upload (PDF / Image) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1" style={{ color: '#1e293b' }}>
                    Upload Certificate File (PDF / Image)
                  </label>
                  <div 
                    className="border-2 border-dashed border-slate-300 hover:border-primary rounded-2xl p-3.5 text-center bg-slate-50 hover:bg-white transition-all cursor-pointer relative"
                    style={{ backgroundColor: '#f8fafc' }}
                  >
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setCertFile(e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {certFile ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold text-xs">
                        <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate max-w-[260px]">
                          {certFile.name} ({(certFile.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-0.5 text-slate-500">
                        <Upload className="w-5 h-5 mx-auto text-slate-400" />
                        <p className="text-xs font-bold text-slate-700">
                          Drop certificate file here or <span className="text-primary font-bold">browse</span>
                        </p>
                        <p className="text-[10px] text-slate-400">PDF, PNG, JPG (Max 10MB)</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-2 flex gap-2 justify-end border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsCertModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={certUploading}
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs disabled:opacity-50 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {certUploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating Certificate...</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-3.5 h-3.5" />
                        <span>Generate & Issue Certificate</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
