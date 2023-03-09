import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionCreateNestedManyWithoutBankInputSchema } from './TransactionCreateNestedManyWithoutBankInputSchema';

export const BankCreateWithoutUserInputSchema: z.ZodType<Prisma.BankCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  account: z.string(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutBankInputSchema).optional(),
}).strict();

export default BankCreateWithoutUserInputSchema;
