import { defineCollection, z } from 'astro:content';

const scheduleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    time: z.string(),
    stage: z.string().optional(),
    performer: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    order: z.number().optional()
  })
});

const transparencyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    category: z.string(),
    amount: z.number(),
    description: z.string(),
    percentage: z.number().optional()
  })
});

export const collections = {
  schedule: scheduleCollection,
  transparency: transparencyCollection
};