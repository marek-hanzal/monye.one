import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankWhereInputSchema } from './BankWhereInputSchema';

export const BankListRelationFilterSchema: z.ZodType<Prisma.BankListRelationFilter> = z.object({
  every: z.lazy(() => BankWhereInputSchema).optional(),
  some: z.lazy(() => BankWhereInputSchema).optional(),
  none: z.lazy(() => BankWhereInputSchema).optional()
}).strict();

export default BankListRelationFilterSchema;
