import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenCreateManyTokenInputSchema } from './UserTokenCreateManyTokenInputSchema';

export const UserTokenCreateManyTokenInputEnvelopeSchema: z.ZodType<Prisma.UserTokenCreateManyTokenInputEnvelope> = z.object({
  data: z.lazy(() => UserTokenCreateManyTokenInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default UserTokenCreateManyTokenInputEnvelopeSchema;
