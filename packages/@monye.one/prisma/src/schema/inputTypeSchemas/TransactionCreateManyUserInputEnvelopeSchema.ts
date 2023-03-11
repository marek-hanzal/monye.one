import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionCreateManyUserInputSchema } from './TransactionCreateManyUserInputSchema';

export const TransactionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionCreateManyUserInputSchema),z.lazy(() => TransactionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default TransactionCreateManyUserInputEnvelopeSchema;
