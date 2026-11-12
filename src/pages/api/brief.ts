import type { APIRoute } from 'astro';
import { generateBrief } from '../../lib/brief';

export const prerender = false;

// Best-effort abuse protection. Per-instance memory only, so it resets on cold starts.
// The real cost guard is a monthly spend limit on the Anthropic API key.
const hits = new Map<string, number[]>();
const LIMIT = 5; // briefs per IP per hour
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (recent.length >= LIMIT) return true;
  hits.set(ip, [...recent, now]);
  return false;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY ?? process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return json({ error: 'The demo is not configured yet.' }, 503);

  let body: { domain?: unknown; offer?: unknown };
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }

  const domain = String(body.domain ?? '').trim().toLowerCase()
    .replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[/?#]/)[0];
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain) || domain.length > 100) {
    return json({ error: 'Enter a company domain like acme.com.' }, 400);
  }
  const offer = String(body.offer ?? '').trim().slice(0, 200) || 'GTM engineering services: signal-based outbound, enrichment and routing, and GTM stack consolidation';

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || clientAddress || 'unknown';
  if (rateLimited(ip)) return json({ error: 'You have hit the demo limit for now. Try again in an hour.' }, 429);

  try {
    const brief = await generateBrief(apiKey, domain, offer);
    return json({ domain, brief });
  } catch (err) {
    console.error('brief failed', err);
    return json({ error: 'Something went wrong while researching that company. Please try again.' }, 500);
  }
};
