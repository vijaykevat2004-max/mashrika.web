import { promises as fs } from 'fs';
import path from 'path';
import siteContent from '@/data/site-content.json';
import { SiteContent } from '@/types/site';
import { kv } from '@vercel/kv';

const contentPath = path.join(process.cwd(), 'data', 'site-content.json');
const KV_KEY = 'mashrika:site-content';

function canUseKv() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function readSiteContent(): Promise<SiteContent> {
  if (canUseKv()) {
    const value = await kv.get<SiteContent>(KV_KEY);
    if (value) return value;
  }

  try {
    const raw = await fs.readFile(contentPath, 'utf8');
    return JSON.parse(raw) as SiteContent;
  } catch {
    return siteContent as SiteContent;
  }
}

export async function writeSiteContent(content: SiteContent) {
  if (canUseKv()) {
    await kv.set(KV_KEY, content);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error('KV not configured. Add Vercel KV env vars to enable persistent admin saves.');
  }

  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), 'utf8');
}
