import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionUpdateWithoutBankInputSchema } from './TransactionUpdateWithoutBankInputSchema';
import { TransactionUncheckedUpdateWithoutBankInputSchema } from './TransactionUncheckedUpdateWithoutBankInputSchema';

export const TransactionUpdateWithWhereUniqueWithoutBankInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutBankInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutBankInputSchema) ]),
}).strict();

export default TransactionUpdateWithWhereUniqueWithoutBankInputSchema;
