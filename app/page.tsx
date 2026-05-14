'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  Building2,
  CircleCheckBig,
  ChevronRight,
  Cpu,
  Drill,
  FileCheck2,
  FlaskConical,
  Factory,
  Fan,
  Handshake,
  Hospital,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  Shield,
  Settings,
  ShieldCheck,
  Sparkles,
  Warehouse,
  Waves,
  Workflow,
  Wrench
} from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/content', { cache: 'no-store' });
      if (!res.ok) return;
      const data = (await res.json()) as SiteContent;
      setContent(data);
    };
    void load();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 30);
      const ids = ['about', 'services', 'industries', 'projects', 'contact'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          setActiveSection(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: '',
    projectType: '',
    budgetRange: '',
    timeline: '',
    attachmentName: ''
  });
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage('');
    const res = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const payload = (await res.json().catch(() => ({ message: 'Submission failed.' }))) as { message?: string };
    setFormMessage(payload.message || (res.ok ? 'Inquiry submitted.' : 'Submission failed.'));
    if (res.ok) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        requirement: '',
        projectType: '',
        budgetRange: '',
        timeline: '',
        attachmentName: ''
      });
    }
    setIsSubmitting(false);
  };

  const whatsappUrl = useMemo(() => `https://wa.me/${content.contact.whatsapp}`, [content.contact.whatsapp]);

  return (
    <main className="dark:bg-ink dark:text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:60px_60px] dark:opacity-30" />

      <header className={`sticky top-0 z-50 transition ${isScrolled ? 'border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85' : 'bg-transparent'}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="font-[family-name:var(--font-display)] text-xl font-semibold">{content.brandName}</div>
          <div className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {['about', 'services', 'industries', 'projects', 'contact'].map((id) => (
              <a key={id} href={`#${id}`} className={`relative pb-1 capitalize transition hover:text-accent ${activeSection === id ? 'text-accent' : ''}`}>
                {id}
                {activeSection === id ? <span className="absolute -bottom-0 left-0 h-0.5 w-full bg-accent" /> : null}
              </a>
            ))}
            <div className="group relative">
              <button className="transition hover:text-accent">Solutions</button>
              <div className="invisible absolute left-1/2 top-9 z-20 w-[680px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-6 opacity-0 shadow-premium transition group-hover:visible group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-950">
                <div className="grid grid-cols-2 gap-4">
                  {content.services.slice(0, 6).map((service) => (
                    <a key={service.title} href="#services" className="rounded-xl border border-slate-200 p-3 text-left transition hover:border-accent dark:border-slate-800">
                      <p className="text-sm font-semibold">{service.title}</p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{service.text}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href="#contact" className="rounded-full bg-primary px-4 py-2 text-sm text-white transition hover:bg-accent">
              Get Quote
            </a>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden bg-mesh-grid text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-primary/85 to-primary/65" />
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-20 [background:repeating-linear-gradient(120deg,transparent_0,transparent_38px,rgba(255,255,255,.2)_39px,transparent_40px)]" />
        <motion.div
          className="absolute -right-24 top-10 h-72 w-72 rounded-full border border-white/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -right-10 top-24 h-44 w-44 rounded-full border border-accent/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        />
        <Image
          src={content.hero.bgImage}
          alt="Industrial automation and HVAC facility"
          fill
          className="-z-10 object-cover"
          priority
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
          poster={content.hero.bgImage}
        >
          <source src="https://cdn.coverr.co/videos/coverr-power-plant-1579/1080p.mp4" type="video/mp4" />
        </video>
        <div className="relative mx-auto grid min-h-[84vh] max-w-7xl items-center px-6 py-20 lg:grid-cols-2 lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
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
            transition={{ duration: 1.1, delay: 0.25 }}
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

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-premium dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-4">
          {[
            ['ISO Standard Execution', FileCheck2],
            ['Industrial Safety Compliance', Shield],
            ['Warranty-Backed Delivery', BadgeCheck],
            ['Trusted Engineering Partner', Handshake]
          ].map(([text, Icon]) => (
            <div key={text as string} className="inline-flex items-center gap-2 text-sm font-semibold">
              <Icon size={16} className="text-accent" /> {text as string}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          <motion.article whileHover={{ y: -4 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium dark:border-slate-800 dark:bg-slate-900">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent"><Sparkles size={14} /> Engineering Depth</p>
            <h3 className="mt-3 text-xl font-semibold">Design to Commissioning Under One Team</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Single-window execution from concept drawings and BOQ planning to testing, balancing, and handover documentation.</p>
          </motion.article>
          <motion.article whileHover={{ y: -4 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium dark:border-slate-800 dark:bg-slate-900">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent"><Drill size={14} /> Site Reliability</p>
            <h3 className="mt-3 text-xl font-semibold">Multi-Discipline Industrial Execution</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">HVAC, piping, electrical, controls and maintenance teams coordinated with strict permit-to-work and EHS protocols.</p>
          </motion.article>
          <motion.article whileHover={{ y: -4 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium dark:border-slate-800 dark:bg-slate-900">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent"><CircleCheckBig size={14} /> Compliance First</p>
            <h3 className="mt-3 text-xl font-semibold">Audit-Ready Documentation and Quality</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Welding logs, pressure tests, FAT/SAT records, and commissioning reports prepared to client and regulatory standards.</p>
          </motion.article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-premium dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-px bg-slate-200 dark:bg-slate-800 md:grid-cols-4">
            {[
              ['Projects Completed', '120+'],
              ['Industries Served', '15+'],
              ['Engineers & Experts', '25+'],
              ['Support Availability', '24/7']
            ].map(([label, value]) => (
              <div key={label} className="bg-white p-6 text-center dark:bg-slate-900">
                <p className="text-3xl font-bold text-primary dark:text-accent">{value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</p>
              </div>
            ))}
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
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.services.map(({ icon, title, text }, index) => {
              const Icon = iconMap[icon];
              return (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="group relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-7 transition hover:-translate-y-1 hover:border-accent hover:shadow-premium dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-950/95 dark:to-slate-900"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition group-hover:opacity-100" />
                <Icon className="mb-4 text-primary transition group-hover:text-accent" />
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">{text}</p>
              </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-ink px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">Execution Framework</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['01', 'Engineering Survey', 'Load study, utility mapping, and process requirement capture.'],
              ['02', 'Detailed Planning', 'Design review, fabrication strategy, and delivery milestones.'],
              ['03', 'Site Execution', 'Disciplined installation with QA/QC checks at every stage.'],
              ['04', 'Commissioning', 'Testing, performance validation, training, and handover.']
            ].map(([step, title, text]) => (
              <article key={step} className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
                <p className="text-sm font-bold text-accent">{step}</p>
                <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-200">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">Smart Utility Flow Diagram</h2>
          <p className="mt-3 max-w-3xl text-slate-300">Interactive view of how Mashrika integrates utility systems, controls, and site execution for stable plant operations.</p>
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <svg viewBox="0 0 1200 260" className="w-full">
              {[130, 390, 650, 910].map((x, index) => (
                <g key={x}>
                  <rect x={x - 110} y={85} width="220" height="90" rx="14" fill="#0f243f" stroke="#2a3f59" />
                  <text x={x} y={120} textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="700">
                    {['Design', 'Fabrication', 'Installation', 'Commissioning'][index]}
                  </text>
                  <text x={x} y={145} textAnchor="middle" fill="#94a3b8" fontSize="12">
                    {['Load study', 'QA welds', 'Site execution', 'Performance tests'][index]}
                  </text>
                </g>
              ))}
              <motion.path
                d="M240 130 H280 M500 130 H540 M760 130 H800"
                stroke="#f47c20"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-[#0f2948] to-[#10253f] p-10 text-white shadow-premium">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Industrial Consultation Desk</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">Ready to Build Reliable Industrial Infrastructure?</h2>
          <p className="mt-4 max-w-3xl text-slate-200">Connect with our engineering team for site survey, system design, project planning, and lifecycle support.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white">Get Consultation</a>
            <a href="#contact" className="rounded-full border border-white/40 px-5 py-3 text-sm font-semibold">Request Quotation</a>
            <a href={whatsappUrl} className="rounded-full border border-white/40 px-5 py-3 text-sm font-semibold">Talk to Engineer</a>
          </div>
        </div>
      </section>

      <section id="industries" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">Industries We Serve</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.industries.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 font-medium transition hover:-translate-y-1 hover:border-accent hover:shadow-premium dark:border-slate-800 dark:bg-slate-900">
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
          {content.projects.map(({ title, image, slug, location, metric, timeline, technologies }, idx) => (
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
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <span className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">{metric || 'Industrial Grade'}</span>
                  <span className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">{timeline || 'Timeline'}</span>
                  <span className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">{location || 'India'}</span>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{(technologies || []).slice(0, 3).join(' • ')}</p>
                {slug ? (
                  <Link href={`/projects/${slug}`} className="mt-3 inline-flex text-sm font-semibold text-accent">
                    View Case Study
                  </Link>
                ) : null}
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

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(244,124,32,.18),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(12,36,64,.16),transparent_35%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl border border-slate-200 bg-white/85 p-10 shadow-premium backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Industrial Confidence</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">Built for Critical Facilities Where Downtime Is Not an Option</h2>
            <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">From pharma process areas to high-load data center floors, Mashrika Projects delivers engineered systems with uptime-driven design, controlled execution, and long-term service commitment.</p>
          </div>
          <div className="grid gap-3">
            {['GMP/Process Environment Familiarity', 'EHS-Compliant Site Execution', 'Experienced in Brownfield & Greenfield Projects', 'Rapid AMC Response with Technical Team'].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium dark:border-slate-700 dark:bg-slate-900">
                <span className="inline-flex items-center gap-2"><CircleCheckBig size={16} className="text-accent" /> {item}</span>
              </div>
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
          <form onSubmit={submitInquiry} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-4">
              <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="rounded-lg border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="Your Name" />
              <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-lg border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="Email Address" />
              <input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="rounded-lg border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="Phone Number" />
              <textarea required value={formData.requirement} onChange={(e) => setFormData({ ...formData, requirement: e.target.value })} className="h-32 rounded-lg border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="Project Requirement" />
              <select className="rounded-lg border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}>
                <option value="">Project Type</option>
                <option>HVAC</option>
                <option>Industrial Piping</option>
                <option>Electrical Infrastructure</option>
                <option>Automation</option>
                <option>Turnkey Engineering</option>
              </select>
              <select className="rounded-lg border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}>
                <option value="">Budget Range</option>
                <option>Below 25 Lakhs</option>
                <option>25 Lakhs - 1 Crore</option>
                <option>1 Crore - 5 Crore</option>
                <option>Above 5 Crore</option>
              </select>
              <select className="rounded-lg border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}>
                <option value="">Execution Timeline</option>
                <option>Immediate</option>
                <option>Within 1 Month</option>
                <option>1-3 Months</option>
                <option>3+ Months</option>
              </select>
              <input type="file" className="rounded-lg border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" onChange={(e) => {
                const file = e.target.files?.[0];
                setFormData({ ...formData, attachmentName: file?.name || '' });
              }} />
              <button disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70">
                Submit Inquiry <ChevronRight size={16} />
              </button>
              {formMessage ? <p className="text-sm text-slate-600 dark:text-slate-300">{formMessage}</p> : null}
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
            <div className="mt-4 flex gap-3 text-sm">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="hover:text-white">YouTube</a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
            </div>
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
