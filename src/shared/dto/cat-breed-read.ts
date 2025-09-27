import { z } from 'zod';

export const catBreedSchema = z.object({
  id: z.string(),
  name: z.string(),
  temperament: z.string().optional(),
  origin: z.string().optional(),
  description: z.string().optional(),
});

export type CatBreed = z.infer<typeof catBreedSchema>;
