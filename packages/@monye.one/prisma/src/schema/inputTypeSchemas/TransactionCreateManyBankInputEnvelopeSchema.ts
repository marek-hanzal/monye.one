import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionCreateManyBankInputSchema } from './TransactionCreateManyBankInputSchema';

export const TransactionCreateManyBankInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyBankInputEnvelope> = z.object({
  data: z.lazy(() => TransactionCreateManyBankInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default TransactionCreateManyBankInputEnvelopeSchema;
