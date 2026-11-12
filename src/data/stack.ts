// The jobs each tool can do. Kept deliberately coarse: the point is spotting overlap, not feature-level comparison.
export const jobs = {
  data: 'Contact data and lists',
  enrich: 'Enrichment',
  seq: 'Email sequencing',
  dialer: 'Dialer',
  intent: 'Intent data',
  visitor: 'Website visitor ID',
  sched: 'Meeting scheduling',
  ci: 'Call recording and analysis',
  crm: 'CRM',
  jobchange: 'Job-change tracking',
} as const;
export type Job = keyof typeof jobs;

export interface StackTool { name: string; jobs: Job[] }

export const stackTools: StackTool[] = [
  { name: 'Salesforce', jobs: ['crm'] },
  { name: 'HubSpot Sales Hub', jobs: ['crm', 'seq', 'sched'] },
  { name: 'Apollo', jobs: ['data', 'enrich', 'seq', 'dialer', 'intent'] },
  { name: 'ZoomInfo', jobs: ['data', 'enrich', 'intent', 'visitor'] },
  { name: 'Clay', jobs: ['enrich', 'data'] },
  { name: 'Lusha', jobs: ['data', 'enrich'] },
  { name: 'Cognism', jobs: ['data', 'enrich'] },
  { name: 'Seamless.AI', jobs: ['data'] },
  { name: 'LinkedIn Sales Navigator', jobs: ['data', 'jobchange'] },
  { name: 'Outreach', jobs: ['seq', 'dialer'] },
  { name: 'Salesloft', jobs: ['seq', 'dialer', 'ci'] },
  { name: 'Instantly', jobs: ['seq'] },
  { name: 'Smartlead', jobs: ['seq'] },
  { name: 'lemlist', jobs: ['seq'] },
  { name: 'Orum', jobs: ['dialer'] },
  { name: 'Nooks', jobs: ['dialer'] },
  { name: 'Aircall', jobs: ['dialer'] },
  { name: 'Gong', jobs: ['ci'] },
  { name: '6sense', jobs: ['intent', 'visitor'] },
  { name: 'Demandbase', jobs: ['intent', 'visitor'] },
  { name: 'Bombora', jobs: ['intent'] },
  { name: 'RB2B', jobs: ['visitor'] },
  { name: 'Warmly', jobs: ['visitor'] },
  { name: 'Koala', jobs: ['visitor', 'intent'] },
  { name: 'UserGems', jobs: ['jobchange'] },
  { name: 'Calendly', jobs: ['sched'] },
  { name: 'Chili Piper', jobs: ['sched'] },
];
