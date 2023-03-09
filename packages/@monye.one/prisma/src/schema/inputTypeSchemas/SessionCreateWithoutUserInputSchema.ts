import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
}).strict();

export default SessionCreateWithoutUserInputSchema;
