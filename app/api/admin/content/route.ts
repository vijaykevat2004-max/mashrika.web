import { NextResponse } from 'next/server';
import { readSiteContent, writeSiteContent } from '@/lib/content-store';
import { SiteContent } from '@/types/site';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function isAuthed(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const pairs = cookie.split(';').map((part) => part.trim());
  const entry = pairs.find((part) => part.startsWith('mashrika_admin='));
  if (!entry) return false;
  const raw = entry.split('=')[1] || '';
  const value = decodeURIComponent(raw);
  return value === '1';
}

export async function GET(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ ok: false, message: 'Unauthorized. Please login again.' }, { status: 401 });
  }
  const content = await readSiteContent();
  return NextResponse.json(content);
}

export async function PUT(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ ok: false, message: 'Unauthorized. Please login again.' }, { status: 401 });
  }

  const payload = (await req.json()) as SiteContent;
  await writeSiteContent(payload);
  return NextResponse.json({ ok: true });
}
