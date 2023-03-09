import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';

export const BankScalarWhereInputSchema: z.ZodType<Prisma.BankScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BankScalarWhereInputSchema),z.lazy(() => BankScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankScalarWhereInputSchema),z.lazy(() => BankScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  account: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default BankScalarWhereInputSchema;
