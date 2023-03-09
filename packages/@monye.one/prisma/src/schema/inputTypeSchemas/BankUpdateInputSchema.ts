import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutBankNestedInputSchema } from './UserUpdateOneRequiredWithoutBankNestedInputSchema';
import { TransactionUpdateManyWithoutBankNestedInputSchema } from './TransactionUpdateManyWithoutBankNestedInputSchema';

export const BankUpdateInputSchema: z.ZodType<Prisma.BankUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBankNestedInputSchema).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutBankNestedInputSchema).optional(),
}).strict();

export default BankUpdateInputSchema;
