import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  PlusCircle, 
  MoreVertical, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Search,
  Filter,
  UserPlus
} from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Students", value: "148", change: "+14 this month", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Active Courses", value: "2", change: "47 Lessons live", icon: BookOpen, color: "text-primary", bg: "bg-emerald-50" },
    { title: "Certificates Issued", value: "38", change: "Cryptographically verified", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Avg Completion Rate", value: "84.2%", change: "+3.1% overall", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
  ];

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
      updatedAt: "11 Sep 2026"
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
      updatedAt: "11 Sep 2026"
    }
  ];

  const recentStudents = [
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      course: "ESG Basics for Fashion & Manufacturing",
      progress: 100,
      status: "Certified",
      joined: "12 Oct 2026"
    },
    {
      id: 2,
      name: "Priya Nair",
      email: "priya.nair@example.com",
      course: "ESG Basics for Fashion & Manufacturing",
      progress: 68,
      status: "In Progress",
      joined: "09 Oct 2026"
    },
    {
      id: 3,
      name: "Rohan Patel",
      email: "rohan.patel@example.com",
      course: "Carbon Markets & I-RECs Fundamentals",
      progress: 42,
      status: "In Progress",
      joined: "05 Oct 2026"
    },
    {
      id: 4,
      name: "Ananya Deshmukh",
      email: "ananya.d@example.com",
      course: "Carbon Markets & I-RECs Fundamentals",
      progress: 100,
      status: "Certified",
      joined: "01 Oct 2026"
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Hestiya Learning Operations</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage curriculum, student enrolments, assessment scores, and verified certificates.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-nowrap shrink-0">
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> Create Course
          </Link>
          <Link
            href="/admin/students"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> Manage Students
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 truncate">{item.title}</span>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">{item.value}</div>
                <div className="text-[11px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 font-medium truncate">{item.change}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 1: Course Management Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Active Curriculum & Courses</h3>
            <p className="text-xs text-gray-500">Live self-paced courses and their current cohort participation</p>
          </div>
          <Link 
            href="/admin/courses" 
            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
          >
            View all courses &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 min-w-[640px]">
            <thead className="bg-gray-50/75 text-xs uppercase font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-6">Course Name</th>
                <th className="py-3.5 px-4">Modules / Lessons</th>
                <th className="py-3.5 px-4">Students Enrolled</th>
                <th className="py-3.5 px-4">Completed</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900 max-w-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                        C{course.id}
                      </div>
                      <span className="truncate">{course.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-700">
                    {course.modules} Modules <span className="text-gray-400">({course.lessons} lessons)</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-900">
                    {course.enrolled}
                  </td>
                  <td className="py-4 px-4 text-emerald-600 font-bold">
                    {course.completions}
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
                        className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View Live Course"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={`/admin/courses/${course.id}`}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg transition-colors"
                      >
                        Manage
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Recent Student Activity Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Recent Student Enrolments</h3>
            <p className="text-xs text-gray-500">Live learner progress and certification completions</p>
          </div>
          <Link 
            href="/admin/students" 
            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
          >
            Manage all students &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 min-w-[700px]">
            <thead className="bg-gray-50/75 text-xs uppercase font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-6">Learner</th>
                <th className="py-3.5 px-4">Enrolled Course</th>
                <th className="py-3.5 px-4">Progress</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">{student.name}</div>
                    <div className="text-xs text-gray-400">{student.email}</div>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-700 max-w-xs truncate">
                    {student.course}
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-36 space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-gray-700">
                        <span>{student.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} 
                          style={{ width: `${student.progress}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {student.status === "Certified" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3.5 h-3.5" /> In Progress
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-xs font-medium text-gray-500">
                    {student.joined}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg transition-colors">
                      View Profile
                    </button>
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
