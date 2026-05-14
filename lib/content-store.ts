import { promises as fs } from 'fs';
import path from 'path';
import siteContent from '@/data/site-content.json';
import { SiteContent } from '@/types/site';
import { normalizeSiteContent } from '@/lib/normalize-site-content';

const contentPath = path.join(process.cwd(), 'data', 'site-content.json');
const KV_KEY = 'mashrika:site-content';

function findEnv(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];
    if (value) return value;
  }
  return '';
}

function getKvConfig() {
  const url = findEnv(
    'KV_REST_API_URL',
    'UPSTASH_REDIS_REST_URL',
    'STORAGE_KV_REST_API_URL'
  );
  const token = findEnv(
    'KV_REST_API_TOKEN',
    'UPSTASH_REDIS_REST_TOKEN',
    'STORAGE_KV_REST_API_TOKEN'
  );
  return { url, token };
}

function canUseKv() {
  const { url, token } = getKvConfig();
  return Boolean(url && token);
}

async function kvGet<T>(key: string): Promise<T | null> {
  const { url, token } = getKvConfig();
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { result?: T | null };
  return data.result ?? null;
}

async function kvSet<T>(key: string, value: T) {
  const { url, token } = getKvConfig();
  await fetch(`${url}/set/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(value),
    cache: 'no-store'
  });
}

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
