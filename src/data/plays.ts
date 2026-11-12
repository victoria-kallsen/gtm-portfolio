// Plays: concrete builds described step by step. No results claimed here; results live in case studies.
export const plays = [
  {
    name: 'Hiring-signal outbound',
    trigger: 'A target account posts a job that implies a new budget, like "Head of RevOps" or "first SDR".',
    steps: ['Job post detected', 'Account scored against ICP', 'Hiring manager + team found', 'Email references the role'],
  },
  {
    name: 'Champion job-change play',
    trigger: 'Someone who used your product at a past company starts somewhere new.',
    steps: ['Past users re-enriched monthly', 'New company checked for fit', 'Owner alerted in Slack', '"Congrats + quick idea" email'],
  },
  {
    name: 'Closed-lost revival',
    trigger: 'A deal you lost 6+ months ago shows new activity: pricing-page visits, new leadership, or fresh funding.',
    steps: ['Lost deals watched for signals', 'Original reason for loss pulled from CRM', 'Fresh angle written for that reason', 'Back to the original AE'],
  },
  {
    name: 'Inbound speed-to-lead',
    trigger: 'A demo request comes in and needs to reach the right rep before the buyer goes cold.',
    steps: ['Form submitted', 'Company + person enriched', 'Scored and routed by territory', 'Rep pinged in Slack within a minute'],
  },
  {
    name: 'Competitor displacement',
    trigger: 'An account runs a competitor\'s tool, and the renewal or a pain signal is coming up.',
    steps: ['Tech stack detected', 'Reviews and complaints checked', 'Users of the tool found', 'Message built around switching'],
  },
  {
    name: 'Waterfall enrichment',
    trigger: 'No single data provider finds enough valid emails and phone numbers on its own.',
    steps: ['Cheapest provider first', 'Misses passed to the next', 'Every email verified', 'Coverage and cost tracked per record'],
  },
];
