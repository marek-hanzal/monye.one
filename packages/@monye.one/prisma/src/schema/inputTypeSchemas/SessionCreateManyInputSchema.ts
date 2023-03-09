import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
}).strict();

export default SessionCreateManyInputSchema;
