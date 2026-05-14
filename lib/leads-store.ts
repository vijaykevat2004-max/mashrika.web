import { canUseKv, runKvCommand } from '@/lib/kv-client';
import { InquiryLead } from '@/types/lead';

const LEADS_KEY = 'mashrika:leads';

export async function addLead(lead: InquiryLead) {
  if (!canUseKv()) {
    return;
  }
  await runKvCommand(['LPUSH', LEADS_KEY, JSON.stringify(lead)]);
  await runKvCommand(['LTRIM', LEADS_KEY, 0, 499]);
}

export async function getLeads(): Promise<InquiryLead[]> {
  if (!canUseKv()) {
    return [];
  }
  const response = await runKvCommand(['LRANGE', LEADS_KEY, 0, 199]);
  const items = Array.isArray(response.result) ? response.result : [];
  return items
    .map((item) => {
      if (typeof item !== 'string') return null;
      try {
        return JSON.parse(item) as InquiryLead;
      } catch {
        return null;
      }
    })
    .filter((item): item is InquiryLead => Boolean(item));
}
