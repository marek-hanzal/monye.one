import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { TransactionUpdateManyWithoutBankNestedInputSchema } from './TransactionUpdateManyWithoutBankNestedInputSchema';

export const BankUpdateWithoutUserInputSchema: z.ZodType<Prisma.BankUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutBankNestedInputSchema).optional()
}).strict();

export default BankUpdateWithoutUserInputSchema;
