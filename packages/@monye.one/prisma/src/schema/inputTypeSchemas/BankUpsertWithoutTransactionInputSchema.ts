import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankUpdateWithoutTransactionInputSchema } from './BankUpdateWithoutTransactionInputSchema';
import { BankUncheckedUpdateWithoutTransactionInputSchema } from './BankUncheckedUpdateWithoutTransactionInputSchema';
import { BankCreateWithoutTransactionInputSchema } from './BankCreateWithoutTransactionInputSchema';
import { BankUncheckedCreateWithoutTransactionInputSchema } from './BankUncheckedCreateWithoutTransactionInputSchema';

export const BankUpsertWithoutTransactionInputSchema: z.ZodType<Prisma.BankUpsertWithoutTransactionInput> = z.object({
  update: z.union([ z.lazy(() => BankUpdateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedUpdateWithoutTransactionInputSchema) ]),
  create: z.union([ z.lazy(() => BankCreateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export default BankUpsertWithoutTransactionInputSchema;
