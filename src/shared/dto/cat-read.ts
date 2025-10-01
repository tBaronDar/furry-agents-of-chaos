import { z } from 'zod';
import { catBreedSchema } from './cat-breed-read';

export const catReadSchema = z.object({
  id: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
  breeds: z.array(catBreedSchema),
});

export type CatReadDTO = z.infer<typeof catReadSchema>;
