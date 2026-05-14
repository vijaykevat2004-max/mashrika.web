'use client';

import { useEffect, useState } from 'react';
import { InquiryLead } from '@/types/lead';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<InquiryLead[]>([]);
  const [message, setMessage] = useState('Loading leads...');

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/admin/leads', { cache: 'no-store' });
      const payload = (await res.json().catch(() => ({ ok: false, message: 'Failed to load leads' }))) as {
        ok?: boolean;
        message?: string;
        leads?: InquiryLead[];
      };
      if (!res.ok || !payload.ok) {
        setMessage(payload.message || 'Failed to load leads');
        return;
      }
      setLeads(payload.leads || []);
      setMessage(payload.leads?.length ? '' : 'No leads yet.');
    };
    void load();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-300 bg-white p-8">
        <h1 className="text-3xl font-semibold">Inquiry Leads</h1>
        {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
        <div className="mt-6 space-y-4">
          {leads.map((lead) => (
            <article key={lead.id} className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold">{lead.name}</p>
              <p className="text-sm text-slate-600">{lead.email} | {lead.phone}</p>
              <p className="mt-1 text-xs text-slate-500">{lead.projectType || 'General Inquiry'} | {lead.budgetRange || 'Budget N/A'} | {lead.timeline || 'Timeline N/A'}</p>
              <p className="mt-2 text-sm">{lead.requirement}</p>
              {lead.attachmentName ? <p className="mt-1 text-xs text-slate-500">Attachment: {lead.attachmentName}</p> : null}
              <p className="mt-2 text-xs text-slate-500">{new Date(lead.createdAt).toLocaleString()}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
