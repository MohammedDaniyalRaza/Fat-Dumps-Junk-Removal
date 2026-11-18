import { business } from '../data/business';

/**
 * Quote submission service.
 * Currently prepares clean SMS/mailto handoffs and structured summaries without pretending
 * files were uploaded to a server. A real backend upload endpoint can replace submitQuote().
 */
export function buildEstimateMessage(payload) {
  const lines = [
    `Hi ${business.name}, I'd like a free estimate:`,
    payload.name ? `Name: ${payload.name}` : '',
    payload.phone ? `Phone: ${payload.phone}` : '',
    payload.city ? `Location: ${payload.city}${payload.areaDetail ? ` (${payload.areaDetail})` : ''}` : payload.areaDetail ? `Location: ${payload.areaDetail}` : '',
    payload.categories?.length ? `Items: ${payload.categories.join(', ')}` : '',
    payload.loadSizeLabel ? `Estimated size: ${payload.loadSizeLabel}` : '',
    payload.access ? `Access: ${payload.access}` : '',
    payload.timing ? `Timing: ${payload.timing}${payload.preferredDate ? ` (${payload.preferredDate})` : ''}` : '',
    payload.description ? `Details: ${payload.description}` : '',
    payload.photoCount > 0 ? `(Sending ${payload.photoCount} photo${payload.photoCount === 1 ? '' : 's'} separately)` : '',
  ].filter(Boolean);

  return lines.join('\n');
}

export function buildSmsHref(payload) {
  const body = encodeURIComponent(buildEstimateMessage(payload));
  return `${business.smsHref}?&body=${body}`;
}

export function buildMailtoHref(payload) {
  const subject = encodeURIComponent(
    `Free Estimate Request — ${payload.city || 'North County SD'}${payload.name ? ` (${payload.name})` : ''}`
  );
  const body = encodeURIComponent(
    `${buildEstimateMessage(payload)}\n\n[Please attach your photos to this email before sending]`
  );
  return `${business.emailHref}?subject=${subject}&body=${body}`;
}

export async function submitQuote(payload) {
  // Future hook: POST FormData with photos + fields to backend endpoint here.
  await new Promise((resolve) => setTimeout(resolve, 260));
  return {
    ok: true,
    id: `FD-${Date.now().toString(36).toUpperCase()}`,
    summaryText: buildEstimateMessage(payload),
    smsHref: buildSmsHref(payload),
    mailtoHref: buildMailtoHref(payload),
  };
}
