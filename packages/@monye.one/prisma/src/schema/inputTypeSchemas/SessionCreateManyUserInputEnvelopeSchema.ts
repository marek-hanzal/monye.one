import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionCreateManyUserInputSchema } from './SessionCreateManyUserInputSchema';

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => SessionCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default SessionCreateManyUserInputEnvelopeSchema;
