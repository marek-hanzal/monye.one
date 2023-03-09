import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionCreateManyInputSchema } from '../inputTypeSchemas/TransactionCreateManyInputSchema'

export const TransactionCreateManyArgsSchema: z.ZodType<Prisma.TransactionCreateManyArgs> = z.object({
  data: TransactionCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default TransactionCreateManyArgsSchema;
