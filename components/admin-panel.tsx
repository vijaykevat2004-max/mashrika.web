'use client';

import { useEffect, useState } from 'react';
import { SiteContent } from '@/types/site';

export function AdminPanel() {
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [message, setMessage] = useState('');

  const loadContent = async () => {
    const res = await fetch('/api/admin/content', { cache: 'no-store' });
    if (!res.ok) {
      setContent(null);
      return;
    }
    const data = (await res.json()) as SiteContent;
    setContent(data);
  };

  useEffect(() => {
    void loadContent();
  }, []);

  const login = async () => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (!res.ok) {
      setMessage('Invalid password');
      return;
    }
    setMessage('Logged in');
    await loadContent();
  };

  const save = async () => {
    if (!content) return;
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });
    if (res.ok) {
      setMessage('Saved successfully');
      return;
    }
    const body = (await res.json().catch(() => ({ message: 'Save failed' }))) as { message?: string };
    setMessage(body.message || 'Save failed');
  };

  if (!content) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-300 bg-white p-8">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Set `ADMIN_PASSWORD` in environment for production.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3"
        />
        <button onClick={login} className="mt-4 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white">
          Login
        </button>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-3xl font-semibold">Mashrika Admin Control Panel</h1>
      <p className="text-sm text-slate-600">Edit website text, numbers, and image links. Click save to publish instantly.</p>

      <section className="rounded-xl border border-slate-300 bg-white p-5">
        <p className="font-semibold">Hero Section</p>
        <input className="mt-3 w-full rounded border px-3 py-2" value={content.hero.headline} onChange={(e) => setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })} />
        <textarea className="mt-3 w-full rounded border px-3 py-2" value={content.hero.subheadline} onChange={(e) => setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })} />
        <input className="mt-3 w-full rounded border px-3 py-2" value={content.hero.bgImage} onChange={(e) => setContent({ ...content, hero: { ...content.hero, bgImage: e.target.value } })} />
      </section>

      <section className="rounded-xl border border-slate-300 bg-white p-5">
        <p className="font-semibold">About Text</p>
        <textarea className="mt-3 w-full rounded border px-3 py-2" value={content.about.text} onChange={(e) => setContent({ ...content, about: { ...content.about, text: e.target.value } })} />
      </section>

      <section className="rounded-xl border border-slate-300 bg-white p-5">
        <p className="font-semibold">Services</p>
        {content.services.map((item, idx) => (
          <div key={`${item.title}-${idx}`} className="mt-4 grid gap-2 rounded border p-3">
            <input className="rounded border px-3 py-2" value={item.title} onChange={(e) => {
              const services = [...content.services];
              services[idx].title = e.target.value;
              setContent({ ...content, services });
            }} />
            <textarea className="rounded border px-3 py-2" value={item.text} onChange={(e) => {
              const services = [...content.services];
              services[idx].text = e.target.value;
              setContent({ ...content, services });
            }} />
            <button
              type="button"
              className="justify-self-start rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white"
              onClick={() => {
                const services = content.services.filter((_, i) => i !== idx);
                setContent({ ...content, services });
              }}
            >
              Remove Service
            </button>
          </div>
        ))}
        <button
          type="button"
          className="mt-4 rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
          onClick={() => {
            setContent({
              ...content,
              services: [
                ...content.services,
                { title: 'New Service', text: 'Service description', icon: 'settings' }
              ]
            });
          }}
        >
          Add Service
        </button>
      </section>

      <section className="rounded-xl border border-slate-300 bg-white p-5">
        <p className="font-semibold">Projects</p>
        {content.projects.map((item, idx) => (
          <div key={`${item.title}-${idx}`} className="mt-4 grid gap-2 rounded border p-3">
            <input className="rounded border px-3 py-2" value={item.title} onChange={(e) => {
              const projects = [...content.projects];
              projects[idx].title = e.target.value;
              setContent({ ...content, projects });
            }} />
            <input className="rounded border px-3 py-2" value={item.image} onChange={(e) => {
              const projects = [...content.projects];
              projects[idx].image = e.target.value;
              setContent({ ...content, projects });
            }} />
            <button
              type="button"
              className="justify-self-start rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white"
              onClick={() => {
                const projects = content.projects.filter((_, i) => i !== idx);
                setContent({ ...content, projects });
              }}
            >
              Remove Project
            </button>
          </div>
        ))}
        <button
          type="button"
          className="mt-4 rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
          onClick={() => {
            setContent({
              ...content,
              projects: [
                ...content.projects,
                {
                  title: 'New Project',
                  image:
                    'https://images.unsplash.com/photo-1581093196277-9f608bb3b5c9?auto=format&fit=crop&w=1200&q=80'
                }
              ]
            });
          }}
        >
          Add Project
        </button>
      </section>

      <section className="rounded-xl border border-slate-300 bg-white p-5">
        <p className="font-semibold">Contact</p>
        <input className="mt-2 w-full rounded border px-3 py-2" value={content.contact.phone} onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })} />
        <input className="mt-2 w-full rounded border px-3 py-2" value={content.contact.email} onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })} />
        <input className="mt-2 w-full rounded border px-3 py-2" value={content.contact.address} onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })} />
        <input className="mt-2 w-full rounded border px-3 py-2" value={content.contact.mapEmbedUrl} onChange={(e) => setContent({ ...content, contact: { ...content.contact, mapEmbedUrl: e.target.value } })} />
        <input className="mt-2 w-full rounded border px-3 py-2" value={content.contact.whatsapp} onChange={(e) => setContent({ ...content, contact: { ...content.contact, whatsapp: e.target.value } })} />
      </section>

      <button onClick={save} className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white">Save All Changes</button>
      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
