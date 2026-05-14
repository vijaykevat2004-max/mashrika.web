import { InquiryLead } from '@/types/lead';

export async function sendLeadNotifications(lead: InquiryLead) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `New Mashrika inquiry from ${lead.name}`,
        lead
      })
    }).catch(() => null);
  }

  const whatsappWebhook = process.env.WHATSAPP_WEBHOOK_URL;
  if (whatsappWebhook) {
    await fetch(whatsappWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `New inquiry: ${lead.name} | ${lead.phone} | ${lead.requirement}`,
        lead
      })
    }).catch(() => null);
  }
}
