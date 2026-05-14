import { NextResponse } from 'next/server';
import { addLead } from '@/lib/leads-store';
import { InquiryLead } from '@/types/lead';
import { sendLeadNotifications } from '@/lib/notify';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<InquiryLead>;
  if (!body.name || !body.email || !body.phone || !body.requirement) {
    return NextResponse.json({ ok: false, message: 'Please fill all fields.' }, { status: 400 });
  }

  const lead: InquiryLead = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    requirement: body.requirement.trim(),
    createdAt: new Date().toISOString()
  };

  await addLead(lead);
  await sendLeadNotifications(lead);
  return NextResponse.json({ ok: true, message: 'Inquiry submitted successfully.' });
}
