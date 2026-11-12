import Anthropic from '@anthropic-ai/sdk';

export interface Brief {
  company: { name: string; one_liner: string; industry: string; size: string; stage: string };
  signals: { signal: string; detail: string; when: string; source_url: string; why_it_matters: string }[];
  buying_committee: { role: string; why: string }[];
  fit_score: number;
  recommended_play: string;
  opener: { subject: string; body: string };
  caveats: string;
}

const schema = {
  type: 'object',
  additionalProperties: false,
  required: ['company', 'signals', 'buying_committee', 'fit_score', 'recommended_play', 'opener', 'caveats'],
  properties: {
    company: {
      type: 'object', additionalProperties: false,
      required: ['name', 'one_liner', 'industry', 'size', 'stage'],
      properties: {
        name: { type: 'string' }, one_liner: { type: 'string' }, industry: { type: 'string' },
        size: { type: 'string', description: 'Approximate headcount, e.g. "~150 employees", or "unknown"' },
        stage: { type: 'string', description: 'Funding stage or "public"/"bootstrapped"/"unknown"' },
      },
    },
    signals: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['signal', 'detail', 'when', 'source_url', 'why_it_matters'],
        properties: {
          signal: { type: 'string', description: 'Short label, e.g. "Hiring: Head of RevOps"' },
          detail: { type: 'string' }, when: { type: 'string', description: 'Date or "recent"' },
          source_url: { type: 'string' }, why_it_matters: { type: 'string' },
        },
      },
    },
    buying_committee: {
      type: 'array',
      items: { type: 'object', additionalProperties: false, required: ['role', 'why'], properties: { role: { type: 'string' }, why: { type: 'string' } } },
    },
    fit_score: { type: 'integer', description: '0-100: how good a target this account is for the seller right now' },
    recommended_play: { type: 'string' },
    opener: {
      type: 'object', additionalProperties: false, required: ['subject', 'body'],
      properties: { subject: { type: 'string' }, body: { type: 'string' } },
    },
    caveats: { type: 'string', description: 'What could not be verified, in one or two sentences' },
  },
} as const;

const SYSTEM = `You are a GTM engineer preparing a short account brief before outreach.
Research the company with web search: what it does, size and stage, and recent buying signals from roughly the last 6 months (hiring for relevant roles, funding, leadership changes, launches, expansions, tech changes).
Rules:
- Only report signals you found a source for, and give that source's URL. Never invent people's names, numbers or events. If you found little, say so in caveats and return fewer signals.
- Name roles in the buying committee, not individual people.
- Pick 2 to 4 signals that matter most for the seller's offer.
- The opener is a cold email under 90 words: reference one real signal, connect it to the seller's offer, end with a low-pressure question. Plain language, no hype, no "I hope this finds you well".
- Keep every text field short and concrete.`;

export async function generateBrief(apiKey: string, domain: string, offer: string): Promise<Brief> {
  const client = new Anthropic({ apiKey });
  const messages: Anthropic.Beta.BetaMessageParam[] = [
    { role: 'user', content: `Company domain: ${domain}\nWhat the seller offers: ${offer}\n\nWrite the account brief.` },
  ];

  // Web search can pause a long turn; send it back so the server continues (bounded).
  for (let i = 0; i < 3; i++) {
    const res = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 16000,
      system: SYSTEM,
      output_config: { effort: 'low', format: { type: 'json_schema', schema } },
      tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: 5 }],
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      messages,
    });

    if (res.stop_reason === 'pause_turn') {
      messages.push({ role: 'assistant', content: res.content });
      continue;
    }
    if (res.stop_reason === 'refusal') throw new Error('The model declined this request.');

    const text = res.content.filter((b) => b.type === 'text').map((b) => (b as { text: string }).text).join('');
    return JSON.parse(text) as Brief;
  }
  throw new Error('Research took too long. Please try again.');
}
