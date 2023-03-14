import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional()
}).strict();

export default SessionWhereUniqueInputSchema;
