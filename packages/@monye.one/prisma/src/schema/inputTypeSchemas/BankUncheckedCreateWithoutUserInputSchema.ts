import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionUncheckedCreateNestedManyWithoutBankInputSchema } from './TransactionUncheckedCreateNestedManyWithoutBankInputSchema';

export const BankUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.BankUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  account: z.string(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutBankInputSchema).optional(),
}).strict();

export default BankUncheckedCreateWithoutUserInputSchema;
