import { promises as fs } from 'fs';
import path from 'path';
import siteContent from '@/data/site-content.json';
import { SiteContent } from '@/types/site';
import { normalizeSiteContent } from '@/lib/normalize-site-content';
import { canUseKv, kvGet, kvSet } from '@/lib/kv-client';

const contentPath = path.join(process.cwd(), 'data', 'site-content.json');
const KV_KEY = 'mashrika:site-content';

export async function readSiteContent(): Promise<SiteContent> {
  if (canUseKv()) {
    const value = await kvGet<SiteContent>(KV_KEY);
    if (value) return normalizeSiteContent(value);
  }

  try {
    const raw = await fs.readFile(contentPath, 'utf8');
    return normalizeSiteContent(JSON.parse(raw) as SiteContent);
  } catch {
    return normalizeSiteContent(siteContent as SiteContent);
  }
}

export async function writeSiteContent(content: SiteContent) {
  if (canUseKv()) {
    await kvSet(KV_KEY, content);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error('KV not configured. Add Vercel KV env vars to enable persistent admin saves.');
  }

  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), 'utf8');
}
