import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionWhereInputSchema } from './SessionWhereInputSchema';

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional(),
}).strict();

export default SessionListRelationFilterSchema;
