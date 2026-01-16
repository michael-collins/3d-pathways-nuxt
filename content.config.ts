import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    exercises: defineCollection({
      type: 'page',
      source: 'exercises/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        published: z.boolean().default(true),
        difficulty: z.string().optional(),
        type: z.string().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        oerSchema: z.any().optional(),
        license: z.string().optional(),
        aiUsageWriting: z.string().optional(),
        aiUsageImages: z.string().optional(),
        aiUsageCode: z.string().optional(),
      })
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        published: z.boolean().default(true),
        difficulty: z.string().optional(),
        type: z.string().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        oerSchema: z.any().optional(),
        license: z.string().optional(),
        aiUsageWriting: z.string().optional(),
        aiUsageImages: z.string().optional(),
        aiUsageCode: z.string().optional(),
      })
    }),
    docs: defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
      })
    }),
  }
})
