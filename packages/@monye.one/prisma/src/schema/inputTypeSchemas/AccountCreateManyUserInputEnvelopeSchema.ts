import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountCreateManyUserInputSchema } from './AccountCreateManyUserInputSchema';

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => AccountCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default AccountCreateManyUserInputEnvelopeSchema;
