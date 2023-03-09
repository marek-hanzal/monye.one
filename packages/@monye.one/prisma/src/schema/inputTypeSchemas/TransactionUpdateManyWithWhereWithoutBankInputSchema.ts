import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionScalarWhereInputSchema } from './TransactionScalarWhereInputSchema';
import { TransactionUpdateManyMutationInputSchema } from './TransactionUpdateManyMutationInputSchema';
import { TransactionUncheckedUpdateManyWithoutTransactionInputSchema } from './TransactionUncheckedUpdateManyWithoutTransactionInputSchema';

export const TransactionUpdateManyWithWhereWithoutBankInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutBankInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutTransactionInputSchema) ]),
}).strict();

export default TransactionUpdateManyWithWhereWithoutBankInputSchema;
