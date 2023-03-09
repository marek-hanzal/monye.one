import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionScalarWhereInputSchema } from './TransactionScalarWhereInputSchema';
import { TransactionUpdateManyMutationInputSchema } from './TransactionUpdateManyMutationInputSchema';
import { TransactionUncheckedUpdateManyWithoutTransactionInputSchema } from './TransactionUncheckedUpdateManyWithoutTransactionInputSchema';

export const TransactionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutTransactionInputSchema) ]),
}).strict();

export default TransactionUpdateManyWithWhereWithoutUserInputSchema;
