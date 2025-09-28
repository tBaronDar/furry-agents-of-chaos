import { z } from 'zod';

export const guestSchema = z.object({
  id: z.string(),
  guestName: z.string(),
});

export type Guest = z.infer<typeof guestSchema>;
