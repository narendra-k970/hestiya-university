import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, BookOpen, ArrowRight, GraduationCap } from 'lucide-react';
import Footer from '@/components/Footer';

export default function CourseCatalogue() {
  const courses = [
    {
      id: 1,
      slug: "esg-basics-supply-chains",
      title: "ESG Basics for Fashion & Manufacturing Supply Chains",
      hook: "A company can look perfect on every financial document and still be sitting on a risk nobody was tracking.",
      duration: "4.5 - 6 hours",
      modules: 7,
      lessons: 22,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 2,
      slug: "carbon-markets-irec-fundamentals",
      title: "Carbon Markets & I-RECs Fundamentals",
      hook: "Every company wants to be seen as sustainable, but wanting it and proving it are two very different things.",
      duration: "4.5 - 6 hours",
      modules: 7,
      lessons: 25,
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-primary selection:text-white flex flex-col">
      
      {/* Premium Header / Hero Section */}
      <section className="bg-gray-900 pt-32 pb-24 relative overflow-hidden w-full">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-50 w-full">
          <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
            <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
              <Image src="/images/logo.png" alt="Hestiya Logo" width={40} height={40} className="w-10 h-10 object-contain drop-shadow-md" priority />
              <span className="text-white">Hestiya<span className="text-primary-light font-medium">University</span></span>
            </Link>
            <div className="flex gap-4 items-center">
              <Link href="/login" className="text-sm font-bold text-white bg-primary hover:bg-primary-dark transition-all px-5 py-2.5 rounded-xl shadow-md shadow-primary/30">
                Sign In
              </Link>
            </div>
          </div>
        </nav>
        {/* Abstract Glow Effect Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[40%] h-[150%] bg-primary rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[30%] h-[120%] bg-blue-500 rounded-full blur-[100px] mix-blend-screen" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold tracking-wide shadow-lg backdrop-blur-md mb-2 uppercase">
            <GraduationCap className="w-4 h-4" /> Start Learning Today
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-xl">
            Course Catalogue
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Master the fundamentals of sustainability, carbon markets, and supply chain transparency with our industry-leading certification programs.
          </p>
        </div>
      </section>

      {/* Course Grid Area */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 pb-12 relative z-20 flex-1 w-full">
        <div className="grid md:grid-cols-2 gap-10">
          {courses.map(course => (
            
            /* Entire Card is a Link */
            <Link 
              key={course.id}
              href={`/university/${course.slug}`} 
              className="group flex flex-col bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2"
            >
              
              {/* Premium Image Container with Zoom effect */}
              <div className="relative h-72 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${course.image}')` }}
                />
                {/* Dark Gradient Overlay at the bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                
                {/* Floating Badge inside image */}
                <div className="absolute bottom-6 left-6 flex gap-3">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                    Certification Included
                  </span>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-10 flex flex-col flex-grow">
                <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-primary transition-colors">
                  {course.title}
                </h2>
                
                <p className="text-gray-500 text-lg leading-relaxed flex-grow">
                  {course.hook}
                </p>
                
                {/* Meta details with icons */}
                <div className="flex items-center gap-8 text-sm text-gray-600 py-6 mt-6 border-t border-gray-100">
                  <span className="flex items-center gap-2 font-semibold">
                    <Clock className="w-5 h-5 text-primary" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-2 font-semibold">
                    <BookOpen className="w-5 h-5 text-primary" /> {course.modules} Modules
                  </span>
                </div>
                
                {/* Call to Action Text */}
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-primary flex items-center gap-2 group-hover:text-primary-dark transition-colors text-lg">
                    View Course Details <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </div>
              </div>

            </Link>
          ))}
        </div>
      </section>

      <Footer />

    </div>
  );
}
