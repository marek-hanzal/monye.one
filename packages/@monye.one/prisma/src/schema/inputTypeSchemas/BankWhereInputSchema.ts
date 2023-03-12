import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { TransactionListRelationFilterSchema } from './TransactionListRelationFilterSchema';

export const BankWhereInputSchema: z.ZodType<Prisma.BankWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BankWhereInputSchema),z.lazy(() => BankWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankWhereInputSchema),z.lazy(() => BankWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  account: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionListRelationFilterSchema).optional()
}).strict();

export default BankWhereInputSchema;
