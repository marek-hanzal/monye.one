import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
}).strict();

export default SessionCreateManyUserInputSchema;
