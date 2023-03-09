import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionCreateWithoutBankInputSchema } from './TransactionCreateWithoutBankInputSchema';
import { TransactionUncheckedCreateWithoutBankInputSchema } from './TransactionUncheckedCreateWithoutBankInputSchema';

export const TransactionCreateOrConnectWithoutBankInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutBankInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema) ]),
}).strict();

export default TransactionCreateOrConnectWithoutBankInputSchema;
