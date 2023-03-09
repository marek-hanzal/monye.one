import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { TransactionOrderByRelationAggregateInputSchema } from './TransactionOrderByRelationAggregateInputSchema';

export const BankOrderByWithRelationInputSchema: z.ZodType<Prisma.BankOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  account: z.lazy(() => SortOrderSchema).optional(),
  Transaction: z.lazy(() => TransactionOrderByRelationAggregateInputSchema).optional(),
}).strict();

export default BankOrderByWithRelationInputSchema;
