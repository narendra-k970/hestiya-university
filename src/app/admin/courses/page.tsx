import React from 'react';
import Link from 'next/link';
import { PlusCircle, ExternalLink, BookOpen, Search, Filter, Edit3, Trash2 } from 'lucide-react';

export default function AdminCoursesPage() {
  const courses = [
    {
      id: 1,
      title: "ESG Basics for Fashion & Manufacturing Supply Chains",
      slug: "esg-basics-supply-chains",
      modules: 7,
      lessons: 22,
      enrolled: 92,
      completions: 26,
      status: "Published",
      updatedAt: "11 Sep 2026",
      assessment: "20 Questions (19 MCQ + 1 Short Answer)"
    },
    {
      id: 2,
      title: "Carbon Markets & I-RECs Fundamentals",
      slug: "carbon-markets-irec-fundamentals",
      modules: 7,
      lessons: 25,
      enrolled: 56,
      completions: 12,
      status: "Published",
      updatedAt: "11 Sep 2026",
      assessment: "20 Questions (19 MCQ + 1 Short Answer)"
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Manage Courses</h2>
          <p className="text-sm text-gray-500 mt-0.5">Create, edit, and inspect modules, lessons, and assessment questions.</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" /> Create Course
        </Link>
      </div>

      {/* Course Cards / Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Search and Filters Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-gray-700">Total Courses:</span> {courses.length}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 min-w-[640px]">
            <thead className="bg-gray-50/75 text-xs uppercase font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-6">Course Name</th>
                <th className="py-3.5 px-4">Content Size</th>
                <th className="py-3.5 px-4">Enrolments</th>
                <th className="py-3.5 px-4">Assessment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900 max-w-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                        C{course.id}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 leading-snug">{course.title}</div>
                        <div className="text-xs text-gray-400 font-mono">/university/{course.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700 font-medium text-xs">
                    <div>{course.modules} Modules</div>
                    <div className="text-gray-400">{course.lessons} Lessons total</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-bold text-gray-900">{course.enrolled} learners</div>
                    <div className="text-xs text-emerald-600 font-semibold">{course.completions} graduated</div>
                  </td>
                  <td className="py-4 px-4 text-xs text-gray-600 font-medium">
                    {course.assessment}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {course.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/university/${course.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button 
                        className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
                        title="Edit Syllabus"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
