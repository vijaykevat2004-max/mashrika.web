import { promises as fs } from 'fs';
import path from 'path';
import siteContent from '@/data/site-content.json';
import { SiteContent } from '@/types/site';

const contentPath = path.join(process.cwd(), 'data', 'site-content.json');

export async function readSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(contentPath, 'utf8');
    return JSON.parse(raw) as SiteContent;
  } catch {
    return siteContent as SiteContent;
  }
}

export async function writeSiteContent(content: SiteContent) {
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), 'utf8');
}
