import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutBankNestedInputSchema } from './UserUpdateOneRequiredWithoutBankNestedInputSchema';

export const BankUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.BankUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBankNestedInputSchema).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default BankUpdateWithoutTransactionInputSchema;
