import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { TransactionUncheckedUpdateManyWithoutBankNestedInputSchema } from './TransactionUncheckedUpdateManyWithoutBankNestedInputSchema';

export const BankUncheckedUpdateInputSchema: z.ZodType<Prisma.BankUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutBankNestedInputSchema).optional()
}).strict();

export default BankUncheckedUpdateInputSchema;
