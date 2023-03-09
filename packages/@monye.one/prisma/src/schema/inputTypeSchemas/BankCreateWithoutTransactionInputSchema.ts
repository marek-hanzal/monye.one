import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutBankInputSchema } from './UserCreateNestedOneWithoutBankInputSchema';

export const BankCreateWithoutTransactionInputSchema: z.ZodType<Prisma.BankCreateWithoutTransactionInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBankInputSchema),
  account: z.string(),
}).strict();

export default BankCreateWithoutTransactionInputSchema;
