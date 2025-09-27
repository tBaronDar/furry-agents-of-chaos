import { z } from 'zod';
import { catImageSchema } from './cat-image-read';

export const favoriteCatSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  image_id: z.string(),
  sub_id: z.string().optional(),
  created_at: z.string(),
  image: catImageSchema,
});

export type FavoriteCat = z.infer<typeof favoriteCatSchema>;
