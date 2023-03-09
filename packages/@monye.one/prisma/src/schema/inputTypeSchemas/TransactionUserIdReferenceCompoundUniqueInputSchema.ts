import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TransactionUserIdReferenceCompoundUniqueInputSchema: z.ZodType<Prisma.TransactionUserIdReferenceCompoundUniqueInput> = z.object({
  userId: z.string(),
  reference: z.string(),
}).strict();

export default TransactionUserIdReferenceCompoundUniqueInputSchema;
