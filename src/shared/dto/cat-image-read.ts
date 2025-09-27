import { z } from 'zod';

export const catImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export type CatImage = z.infer<typeof catImageSchema>;
