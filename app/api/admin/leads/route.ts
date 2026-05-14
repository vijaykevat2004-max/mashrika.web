import { NextResponse } from 'next/server';
import { getLeads } from '@/lib/leads-store';

export const dynamic = 'force-dynamic';

function isAuthed(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const pairs = cookie.split(';').map((part) => part.trim());
  const entry = pairs.find((part) => part.startsWith('mashrika_admin='));
  if (!entry) return false;
  const raw = entry.split('=')[1] || '';
  return decodeURIComponent(raw) === '1';
}

export async function GET(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ ok: false, message: 'Unauthorized. Please login again.' }, { status: 401 });
  }
  const leads = await getLeads();
  return NextResponse.json({ ok: true, leads });
}
