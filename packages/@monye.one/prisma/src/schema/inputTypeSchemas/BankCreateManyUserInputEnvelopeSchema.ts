import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankCreateManyUserInputSchema } from './BankCreateManyUserInputSchema';

export const BankCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.BankCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BankCreateManyUserInputSchema),z.lazy(() => BankCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default BankCreateManyUserInputEnvelopeSchema;
