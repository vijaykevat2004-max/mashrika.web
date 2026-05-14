import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readSiteContent } from '@/lib/content-store';

type Props = {
  params: { slug: string };
};

export default async function CaseStudyPage({ params }: Props) {
  const content = await readSiteContent();
  const caseStudy = content.caseStudies.find((item) => item.slug === params.slug);
  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/70 to-slate-950" />
        <div className="relative h-[44vh]">
          <Image src={caseStudy.image} alt={caseStudy.title} fill className="object-cover" priority />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <Link href="/#projects" className="text-sm text-accent">Back to Projects</Link>
        <h1 className="mt-3 text-4xl font-semibold">{caseStudy.title}</h1>
        <p className="mt-4 text-slate-300">{caseStudy.clientType} | {caseStudy.location}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Project Scope</h2>
            <ul className="mt-4 space-y-3 text-slate-300">
              {caseStudy.scope.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Measured Outcomes</h2>
            <ul className="mt-4 space-y-3 text-slate-300">
              {caseStudy.outcomes.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
