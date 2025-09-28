import { z } from 'zod';

export const favoriteCatSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  image_id: z.string(),
  sub_id: z.string(),
  created_at: z.string(),
  image: z.object({
    id: z.string(),
    url: z.string(),
  }),
});

export type FavoriteCat = z.infer<typeof favoriteCatSchema>;
