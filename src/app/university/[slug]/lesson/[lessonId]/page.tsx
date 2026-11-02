import { redirect } from 'next/navigation';

export default async function UniversityLessonRedirect({
  params
}: {
  params: Promise<{ slug: string; lessonId: string }>
}) {
  const resolved = await params;
  redirect(`/courses/${resolved?.slug || 'esg-basics-supply-chains'}/lesson/${resolved?.lessonId || '1'}`);
}
