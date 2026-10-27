import React from 'react';
import { FileCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminAssessmentsPage() {
  const assessments = [
    {
      id: 1,
      course: "ESG Basics for Fashion & Manufacturing Supply Chains",
      totalQuestions: 20,
      format: "19 MCQ + 1 Short Answer",
      passScore: "80%",
      attemptsTotal: 64,
      avgScore: "86.5%",
      status: "Active"
    },
    {
      id: 2,
      course: "Carbon Markets & I-RECs Fundamentals",
      totalQuestions: 20,
      format: "19 MCQ + 1 Short Answer",
      passScore: "80%",
      attemptsTotal: 38,
      avgScore: "82.1%",
      status: "Active"
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Assessments & Question Banks</h2>
        <p className="text-sm text-gray-500 mt-0.5">Manage question banks, randomized answer options, and passing threshold criteria.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {assessments.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {item.status}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-snug">{item.course}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.format}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Questions</span>
                <span className="text-sm font-extrabold text-gray-900">{item.totalQuestions}</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Pass Cutoff</span>
                <span className="text-sm font-extrabold text-gray-900">{item.passScore}</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Avg Score</span>
                <span className="text-sm font-extrabold text-emerald-600">{item.avgScore}</span>
              </div>
            </div>

            <div className="pt-2">
              <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors">
                Inspect 20 Questions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
