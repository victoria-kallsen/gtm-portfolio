// DRAFT: verify each entry against current vendor docs before publishing.
export type ToolType = 'Orchestrator' | 'ABM platform' | 'Data provider' | 'Intent network' | 'Visitor ID' | 'Specialist';

export interface Tool { name: string; type: ToolType; pricing: string; blurb: string }
export interface Source { tool: string; how: string }
export interface Signal { id: string; name: string; why: string; sources: Source[] }

export const tools: Tool[] = [
  { name: 'Clay', type: 'Orchestrator', pricing: 'Self-serve plans', blurb: 'Not a signal source itself. Pulls signals from 100+ integrated providers and AI web research, then lets you combine them.' },
  { name: '6sense', type: 'ABM platform', pricing: 'Annual enterprise contract', blurb: 'Proprietary intent network plus website visitor ID, with predictive "buying stage" scoring on top.' },
  { name: 'Demandbase', type: 'ABM platform', pricing: 'Annual enterprise contract', blurb: 'ABM suite with intent, visitor ID, and advertising. Overlaps heavily with 6sense.' },
  { name: 'Bombora', type: 'Intent network', pricing: 'Annual contract', blurb: 'Co-op of B2B publishers measuring topic research surges by company. Powers intent in several other tools.' },
  { name: 'ZoomInfo', type: 'Data provider', pricing: 'Annual enterprise contract', blurb: 'Large contact and company database with intent, news alerts, technographics and job-change tracking.' },
  { name: 'Apollo', type: 'Data provider', pricing: 'Self-serve plans', blurb: 'Contact database plus sequencing. Includes filters for job postings, funding, technologies and buying intent.' },
  { name: 'Crunchbase', type: 'Data provider', pricing: 'Self-serve plans', blurb: 'Funding rounds, acquisitions and company news.' },
  { name: 'PredictLeads', type: 'Specialist', pricing: 'API plans', blurb: 'Company events parsed from the web: job openings, news, product launches, tech detections.' },
  { name: 'BuiltWith', type: 'Specialist', pricing: 'Self-serve plans', blurb: 'Detects the technologies running on company websites.' },
  { name: 'HG Insights', type: 'Specialist', pricing: 'Annual enterprise contract', blurb: 'Deeper technographics, including back-office software and estimated IT spend.' },
  { name: 'UserGems', type: 'Specialist', pricing: 'Sales-led', blurb: 'Tracks your past customers and champions when they move to new companies.' },
  { name: 'Common Room', type: 'Specialist', pricing: 'Free tier and paid plans', blurb: 'Combines community, social, product and web activity into person-level signals.' },
  { name: 'RB2B', type: 'Visitor ID', pricing: 'Free tier and paid plans', blurb: 'Identifies individual (US) website visitors and sends them to Slack.' },
  { name: 'Koala', type: 'Visitor ID', pricing: 'Free tier and paid plans', blurb: 'Website and product activity tied to accounts and people, with intent scoring.' },
  { name: 'Warmly', type: 'Visitor ID', pricing: 'Free tier and paid plans', blurb: 'Visitor identification plus automated chat and outreach.' },
  { name: 'Trigify', type: 'Specialist', pricing: 'Self-serve plans', blurb: 'Tracks LinkedIn post engagement and keyword activity from prospects.' },
  { name: 'G2 Buyer Intent', type: 'Intent network', pricing: 'Part of paid G2 plans', blurb: 'Shows which companies view your category, profile and competitors on G2.' },
  { name: 'LinkedIn Sales Navigator', type: 'Data provider', pricing: 'Self-serve plans', blurb: 'Job changes, hiring and headcount growth, and account alerts. Data can\'t be exported in bulk.' },
];

export const signals: Signal[] = [
  {
    id: 'hiring', name: 'Hiring and job postings',
    why: 'A new role often means a new budget. A company hiring its first RevOps lead, for example, is about to buy tools.',
    sources: [
      { tool: 'Clay', how: 'Job-posting integrations, plus AI research on careers pages' },
      { tool: 'PredictLeads', how: 'Parsed job openings over time' },
      { tool: 'Apollo', how: 'Job-posting filters on accounts' },
      { tool: 'LinkedIn Sales Navigator', how: 'Hiring and headcount growth alerts' },
      { tool: 'ZoomInfo', how: 'Hiring alerts and news' },
    ],
  },
  {
    id: 'funding', name: 'Funding and M&A',
    why: 'Fresh money is usually spent on growth within 3 to 6 months.',
    sources: [
      { tool: 'Crunchbase', how: 'Funding rounds and acquisitions' },
      { tool: 'Clay', how: 'Pulls funding data from integrated providers' },
      { tool: 'Apollo', how: 'Funding filters' },
      { tool: 'ZoomInfo', how: 'Funding and M&A news alerts' },
    ],
  },
  {
    id: 'intent', name: 'Third-party research intent',
    why: 'The company is reading about your category across the web, before it ever reaches your site.',
    sources: [
      { tool: 'Bombora', how: 'Topic surges from a publisher co-op' },
      { tool: '6sense', how: 'Own intent network, plus keyword research and buying-stage models' },
      { tool: 'Demandbase', how: 'Own intent data' },
      { tool: 'ZoomInfo', how: 'Streaming intent topics' },
      { tool: 'G2 Buyer Intent', how: 'Category and competitor views on G2' },
      { tool: 'Apollo', how: 'Buying-intent topics' },
    ],
  },
  {
    id: 'web', name: 'Visits to your website (account level)',
    why: 'The company is actively looking at you, and its pricing-page visits are the strongest version of that.',
    sources: [
      { tool: '6sense', how: 'Visitor ID by company' },
      { tool: 'Demandbase', how: 'Visitor ID by company' },
      { tool: 'Koala', how: 'Account activity and page-level scoring' },
      { tool: 'Warmly', how: 'Account identification' },
    ],
  },
  {
    id: 'person-web', name: 'Visits to your website (person level)',
    why: 'You know who visited, not just which company, so you can reach out personally.',
    sources: [
      { tool: 'RB2B', how: 'Person-level ID for US visitors' },
      { tool: 'Warmly', how: 'Person-level ID where available' },
      { tool: 'Koala', how: 'Known visitors and identified contacts' },
    ],
  },
  {
    id: 'job-change', name: 'Job changes and champions moving',
    why: 'A past user or buyer at a new company converts far better than a cold prospect.',
    sources: [
      { tool: 'UserGems', how: 'Tracks past customers and champions' },
      { tool: 'Common Room', how: 'Job-change signals on known people' },
      { tool: 'Clay', how: 'Re-enrich contact lists to detect changes' },
      { tool: 'ZoomInfo', how: 'Contact tracking alerts' },
      { tool: 'LinkedIn Sales Navigator', how: 'Saved-lead job change alerts' },
    ],
  },
  {
    id: 'tech', name: 'Tech stack (installs and removals)',
    why: 'Using a competitor or a complementary tool, or just dropping one, signals fit and timing.',
    sources: [
      { tool: 'BuiltWith', how: 'Website technology detection and history' },
      { tool: 'HG Insights', how: 'Install base, including back-office tools' },
      { tool: 'Clay', how: 'Technographic integrations' },
      { tool: 'Apollo', how: 'Technology filters' },
      { tool: 'ZoomInfo', how: 'Technographics' },
      { tool: 'PredictLeads', how: 'Technology detections over time' },
    ],
  },
  {
    id: 'social', name: 'Social engagement',
    why: 'People liking or commenting on posts about your problem are already warm.',
    sources: [
      { tool: 'Trigify', how: 'LinkedIn engagement and keyword tracking' },
      { tool: 'Common Room', how: 'Social and community activity' },
    ],
  },
  {
    id: 'product', name: 'Product usage (for PLG companies)',
    why: 'Free users hitting limits or inviting teammates are your best expansion leads.',
    sources: [
      { tool: 'Koala', how: 'Product events tied to accounts' },
      { tool: 'Common Room', how: 'Product activity alongside other signals' },
    ],
  },
  {
    id: 'news', name: 'News and company events',
    why: 'Expansions, launches, leadership changes and earnings calls create reasons to reach out.',
    sources: [
      { tool: 'Clay', how: 'AI web research on any custom question' },
      { tool: 'PredictLeads', how: 'Parsed news events' },
      { tool: 'ZoomInfo', how: 'News alerts' },
    ],
  },
];
