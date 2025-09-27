import { z } from 'zod';

export const guestSchema = z.object({
  id: z.string(),
  name: z.string(),
  favoriteCats: z.array(z.string()), //we'll store the cat ids here
});

export type Guest = z.infer<typeof guestSchema>;
