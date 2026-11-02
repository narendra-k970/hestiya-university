import { redirect } from 'next/navigation';

export default async function UniversitySlugRedirect({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolved = await params;
  redirect(`/courses/${resolved?.slug || 'esg-basics-supply-chains'}`);
}
