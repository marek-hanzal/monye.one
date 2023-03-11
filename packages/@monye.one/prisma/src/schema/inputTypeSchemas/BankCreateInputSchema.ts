import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutBankInputSchema } from './UserCreateNestedOneWithoutBankInputSchema';
import { TransactionCreateNestedManyWithoutBankInputSchema } from './TransactionCreateNestedManyWithoutBankInputSchema';

export const BankCreateInputSchema: z.ZodType<Prisma.BankCreateInput> = z.object({
  id: z.string().cuid().optional(),
  account: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutBankInputSchema),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutBankInputSchema).optional(),
}).strict();

export default BankCreateInputSchema;
