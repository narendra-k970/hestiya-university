'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Sparkles, BookOpen } from 'lucide-react';

export default function CreateCoursePage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    duration: '4 to 6 hours',
    hook: '',
    description: '',
    audience: 'Corporate executives, university students, ESG practitioners',
    status: 'DRAFT',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generatedSlug,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/courses" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </Link>
        <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 font-bold rounded-full">
          New Curriculum Entry
        </span>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-gray-900">Create New Course</h2>
            <p className="text-xs text-gray-500 mt-0.5">Define core syllabus metadata, commercial hook, and audience targeting.</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        {/* Form Body */}
        <form className="p-4 sm:p-6 space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Course Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Scope 3 Emissions & Supplier Audits"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                URL Slug (Auto-generated) *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="scope-3-emissions-supplier-audits"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-mono text-xs"
              />
            </div>
          </div>

          {/* Duration & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Estimated Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="4.5 to 6 hours"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Publication Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="DRAFT">Draft (Internal Review)</option>
                <option value="PUBLISHED">Published (Visible to Learners)</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          {/* Marketing Hook */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Commercial Hook (Card Summary) *
              </label>
              <span className="text-[11px] text-gray-400">1-2 sentences that appear on the catalogue card</span>
            </div>
            <textarea
              rows={2}
              required
              value={formData.hook}
              onChange={(e) => setFormData({ ...formData, hook: e.target.value })}
              placeholder="A company can look perfect on every financial document and still be sitting on a risk nobody was tracking..."
              className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Detailed Narrative Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Full Syllabus Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide the pedagogical narrative, fictional case study background (ABC Corp), and course outcomes..."
              className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Target Audience
            </label>
            <input
              type="text"
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3">
            <Link
              href="/admin/courses"
              className="w-full sm:w-auto text-center px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Course
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
