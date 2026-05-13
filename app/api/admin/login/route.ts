import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = (await req.json()) as { password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (body.password !== adminPassword) {
    return NextResponse.json({ ok: false, message: 'Invalid password' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set('mashrika_admin', adminPassword, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });
  return response;
}
