import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionUncheckedCreateNestedManyWithoutBankInputSchema } from './TransactionUncheckedCreateNestedManyWithoutBankInputSchema';

export const BankUncheckedCreateInputSchema: z.ZodType<Prisma.BankUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  account: z.string(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutBankInputSchema).optional(),
}).strict();

export default BankUncheckedCreateInputSchema;
