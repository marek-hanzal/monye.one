import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionUserIdReferenceCompoundUniqueInputSchema } from './TransactionUserIdReferenceCompoundUniqueInputSchema';

export const TransactionWhereUniqueInputSchema: z.ZodType<Prisma.TransactionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  userId_reference: z.lazy(() => TransactionUserIdReferenceCompoundUniqueInputSchema).optional()
}).strict();

export default TransactionWhereUniqueInputSchema;
