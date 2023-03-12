import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankWhereInputSchema } from './BankWhereInputSchema';

export const BankRelationFilterSchema: z.ZodType<Prisma.BankRelationFilter> = z.object({
  is: z.lazy(() => BankWhereInputSchema).optional(),
  isNot: z.lazy(() => BankWhereInputSchema).optional()
}).strict();

export default BankRelationFilterSchema;
