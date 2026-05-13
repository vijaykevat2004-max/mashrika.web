import { NextResponse } from 'next/server';
import { readSiteContent, writeSiteContent } from '@/lib/content-store';
import { SiteContent } from '@/types/site';

function isAuthed(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return cookie.includes(`mashrika_admin=${adminPassword}`);
}

export async function GET(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const content = await readSiteContent();
  return NextResponse.json(content);
}

export async function PUT(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const payload = (await req.json()) as SiteContent;
  await writeSiteContent(payload);
  return NextResponse.json({ ok: true });
}
