import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankCreateWithoutTransactionInputSchema } from './BankCreateWithoutTransactionInputSchema';
import { BankUncheckedCreateWithoutTransactionInputSchema } from './BankUncheckedCreateWithoutTransactionInputSchema';
import { BankCreateOrConnectWithoutTransactionInputSchema } from './BankCreateOrConnectWithoutTransactionInputSchema';
import { BankUpsertWithoutTransactionInputSchema } from './BankUpsertWithoutTransactionInputSchema';
import { BankWhereUniqueInputSchema } from './BankWhereUniqueInputSchema';
import { BankUpdateWithoutTransactionInputSchema } from './BankUpdateWithoutTransactionInputSchema';
import { BankUncheckedUpdateWithoutTransactionInputSchema } from './BankUncheckedUpdateWithoutTransactionInputSchema';

export const BankUpdateOneRequiredWithoutTransactionNestedInputSchema: z.ZodType<Prisma.BankUpdateOneRequiredWithoutTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => BankCreateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BankCreateOrConnectWithoutTransactionInputSchema).optional(),
  upsert: z.lazy(() => BankUpsertWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => BankWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BankUpdateWithoutTransactionInputSchema),z.lazy(() => BankUncheckedUpdateWithoutTransactionInputSchema) ]).optional(),
}).strict();

export default BankUpdateOneRequiredWithoutTransactionNestedInputSchema;
