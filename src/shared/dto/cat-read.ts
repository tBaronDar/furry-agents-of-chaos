import { z } from 'zod';
import { catBreedSchema } from './cat-breed-read';

export const catSchema = z.object({
  id: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
  breeds: z.array(catBreedSchema).optional(),
});

export type Cat = z.infer<typeof catSchema>;
