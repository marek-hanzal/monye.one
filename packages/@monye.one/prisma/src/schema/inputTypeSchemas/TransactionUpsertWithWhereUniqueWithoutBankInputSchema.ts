import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionUpdateWithoutBankInputSchema } from './TransactionUpdateWithoutBankInputSchema';
import { TransactionUncheckedUpdateWithoutBankInputSchema } from './TransactionUncheckedUpdateWithoutBankInputSchema';
import { TransactionCreateWithoutBankInputSchema } from './TransactionCreateWithoutBankInputSchema';
import { TransactionUncheckedCreateWithoutBankInputSchema } from './TransactionUncheckedCreateWithoutBankInputSchema';

export const TransactionUpsertWithWhereUniqueWithoutBankInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutBankInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutBankInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema) ]),
}).strict();

export default TransactionUpsertWithWhereUniqueWithoutBankInputSchema;
