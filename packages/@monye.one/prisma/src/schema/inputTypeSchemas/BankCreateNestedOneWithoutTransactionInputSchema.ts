import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankCreateWithoutTransactionInputSchema } from './BankCreateWithoutTransactionInputSchema';
import { BankUncheckedCreateWithoutTransactionInputSchema } from './BankUncheckedCreateWithoutTransactionInputSchema';
import { BankCreateOrConnectWithoutTransactionInputSchema } from './BankCreateOrConnectWithoutTransactionInputSchema';
import { BankWhereUniqueInputSchema } from './BankWhereUniqueInputSchema';

export const BankCreateNestedOneWithoutTransactionInputSchema: z.ZodType<Prisma.BankCreateNestedOneWithoutTransactionInput> = z.object({
  create: z.union([ z.lazy(() => BankCreateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BankCreateOrConnectWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => BankWhereUniqueInputSchema).optional(),
}).strict();

export default BankCreateNestedOneWithoutTransactionInputSchema;
