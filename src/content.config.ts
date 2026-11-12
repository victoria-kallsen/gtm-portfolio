import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    tag: z.string(),
    tools: z.array(z.string()),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })),
    status: z.enum(['live', 'in-progress']).default('live'),
  }),
});

export const collections = { caseStudies };
