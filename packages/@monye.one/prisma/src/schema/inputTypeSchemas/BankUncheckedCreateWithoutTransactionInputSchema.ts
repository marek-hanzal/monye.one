import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const BankUncheckedCreateWithoutTransactionInputSchema: z.ZodType<Prisma.BankUncheckedCreateWithoutTransactionInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  account: z.string(),
}).strict();

export default BankUncheckedCreateWithoutTransactionInputSchema;
