import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutBankInputSchema } from './UserCreateNestedOneWithoutBankInputSchema';

export const BankCreateWithoutTransactionInputSchema: z.ZodType<Prisma.BankCreateWithoutTransactionInput> = z.object({
  id: z.string().optional(),
  account: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutBankInputSchema),
}).strict();

export default BankCreateWithoutTransactionInputSchema;
