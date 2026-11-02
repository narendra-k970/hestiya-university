'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function EnrollRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const course = searchParams.get('course');
    if (course) {
      router.replace(`/register?course=${encodeURIComponent(course)}`);
    } else {
      router.replace('/register');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-700 mb-3" />
      <p className="text-sm font-semibold text-stone-700">Redirecting to Student Registration & Enrollment...</p>
    </div>
  );
}

export default function EnrollPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
      </div>
    }>
      <EnrollRedirect />
    </Suspense>
  );
}