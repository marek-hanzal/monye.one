import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankWhereUniqueInputSchema } from './BankWhereUniqueInputSchema';
import { BankCreateWithoutTransactionInputSchema } from './BankCreateWithoutTransactionInputSchema';
import { BankUncheckedCreateWithoutTransactionInputSchema } from './BankUncheckedCreateWithoutTransactionInputSchema';

export const BankCreateOrConnectWithoutTransactionInputSchema: z.ZodType<Prisma.BankCreateOrConnectWithoutTransactionInput> = z.object({
  where: z.lazy(() => BankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BankCreateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export default BankCreateOrConnectWithoutTransactionInputSchema;
