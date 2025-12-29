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

const yearsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.number(),
    date: z.string(),
    theme: z.string(),
    description: z.string(),
    status: z.enum(['upcoming', 'past']),
    startTime: z.string().optional(),
    endTime: z.string().optional()
  })
});

const artistsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    year: z.number(),
    type: z.enum(['artist', 'musician']),
    instagram: z.string().optional(),
    website: z.string().optional(),
    bio: z.string().optional(),
    order: z.number().optional()
  })
});

export const collections = {
  schedule: scheduleCollection,
  transparency: transparencyCollection,
  years: yearsCollection,
  artists: artistsCollection
};