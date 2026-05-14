'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  Building2,
  ChevronRight,
  Cpu,
  FlaskConical,
  Factory,
  Fan,
  Handshake,
  Hospital,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  Settings,
  ShieldCheck,
  Warehouse,
  Waves,
  Workflow,
  Wrench
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Counter } from '@/components/counter';
import { SiteContent } from '@/types/site';
import defaultContent from '@/data/site-content.json';

const iconMap = {
  fan: Fan,
  workflow: Workflow,
  building2: Building2,
  cpu: Cpu,
  waves: Waves,
  settings: Settings,
  wrench: Wrench
};

export default function HomePage() {
  const [content, setContent] = useState<SiteContent>(defaultContent as SiteContent);

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/content', { cache: 'no-store' });
      if (!res.ok) return;
      const data = (await res.json()) as SiteContent;
      setContent(data);
    };
    void load();
  }, []);

  const whatsappUrl = useMemo(() => `https://wa.me/${content.contact.whatsapp}`, [content.contact.whatsapp]);

  return (
    <main className="dark:bg-ink dark:text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:60px_60px] dark:opacity-30" />

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="font-[family-name:var(--font-display)] text-xl font-semibold">{content.brandName}</div>
          <div className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {['About', 'Services', 'Industries', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-accent">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href="#contact" className="rounded-full bg-primary px-4 py-2 text-sm text-white transition hover:bg-accent">
              Request Consultation
            </a>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden bg-mesh-grid text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-primary/85 to-primary/65" />
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <Image
          src={content.hero.bgImage}
          alt="Industrial automation and HVAC facility"
          fill
          className="-z-10 object-cover"
          priority
        />
        <div className="relative mx-auto grid min-h-[84vh] max-w-7xl items-center px-6 py-20 lg:grid-cols-2 lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em]">
              Industrial Engineering Specialists
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight md:text-6xl">
              {content.hero.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-200">
              {content.hero.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-orange-500">
                Request Consultation
              </a>
              <a href="#services" className="rounded-full border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10">
                View Services
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-200">Performance Snapshot</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {content.counters.map(({ value, label }) => (
                  <div key={label} className="rounded-xl border border-white/20 bg-ink/35 p-4">
                    <p className="text-2xl font-bold text-accent"><Counter value={value} /></p>
                    <p className="mt-1 text-xs text-slate-300">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/80 px-6 py-8 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 text-sm font-semibold text-slate-500 dark:text-slate-300">
          <p className="text-slate-700 dark:text-slate-100">Trusted Across Industrial Segments</p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 dark:border-slate-700"><FlaskConical size={15} /> Pharma Plants</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 dark:border-slate-700"><Factory size={15} /> Manufacturing</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 dark:border-slate-700"><ServerCog size={15} /> Data Centers</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 dark:border-slate-700"><Hospital size={15} /> Hospitals</span>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">About Company</h2>
        <p className="mt-5 max-w-4xl text-lg text-slate-700 dark:text-slate-300">
          {content.about.text}
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {content.about.highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-premium dark:border-slate-800 dark:bg-slate-900">
              <BadgeCheck className="mb-3 text-accent" />
              <p className="text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="bg-slate-100/80 px-6 py-20 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">Services</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.services.map(({ icon, title, text }, index) => {
              const Icon = iconMap[icon];
              return (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-premium dark:border-slate-800 dark:bg-slate-950"
              >
                <Icon className="mb-4 text-primary transition group-hover:text-accent" />
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">{text}</p>
              </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="industries" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">Industries We Serve</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.industries.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 font-medium dark:border-slate-800 dark:bg-slate-900">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">Why Choose Us</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.counters.map(({ value, label }) => (
              <div key={label} className="rounded-2xl border border-white/20 bg-white/5 p-6">
                <p className="text-4xl font-bold text-accent"><Counter value={value} /></p>
                <p className="mt-2 text-slate-200">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">Project Showcase</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content.projects.map(({ title, image }, idx) => (
            <article key={title} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="relative h-56">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-85" />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary">
                  Project {idx + 1}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Executed with industrial safety, compliance, and commissioning protocols.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-20 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">Client Testimonials</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {content.testimonials.map((quote) => (
              <blockquote key={quote} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <Handshake className="mb-4 text-accent" />
                <p className="text-slate-700 dark:text-slate-300">"{quote}"</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">Contact</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2"><Phone size={16} /> {content.contact.phone}</p>
            <p className="inline-flex items-center gap-2"><Mail size={16} /> {content.contact.email}</p>
            <p className="inline-flex items-center gap-2"><MapPin size={16} /> {content.contact.address}</p>
            <div className="overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-700">
              <iframe
                title="Mashrika Projects Location"
                src={content.contact.mapEmbedUrl}
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>
          <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-4">
              <input className="rounded-lg border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="Your Name" />
              <input className="rounded-lg border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="Email Address" />
              <input className="rounded-lg border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="Phone Number" />
              <textarea className="h-32 rounded-lg border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="Project Requirement" />
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:bg-accent">
                Submit Inquiry <ChevronRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-ink px-6 py-14 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">{content.brandName}</p>
            <p className="mt-3 text-sm">Certified industrial engineering partner for turnkey performance-driven delivery.</p>
          </div>
          <div>
            <p className="font-semibold text-white">Quick Links</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#projects">Projects</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Certifications</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>ISO-Compliant Execution</li><li>Industrial Safety Protocols</li><li>Quality Inspection Process</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Industries</p>
            <div className="mt-3 flex gap-2 text-accent"><Factory size={18} /><Hospital size={18} /><Warehouse size={18} /><ShieldCheck size={18} /></div>
            <Link
              href={whatsappUrl}
              className="mt-4 inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
            >
              WhatsApp Support
            </Link>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-7xl border-t border-slate-800 pt-5 text-sm">© {new Date().getFullYear()} {content.brandName}. All rights reserved.</p>
      </footer>

      <Link
        href={whatsappUrl}
        className="fixed bottom-6 right-6 rounded-full bg-accent px-5 py-3 font-semibold text-white shadow-premium"
      >
        WhatsApp
      </Link>
    </main>
  );
}
