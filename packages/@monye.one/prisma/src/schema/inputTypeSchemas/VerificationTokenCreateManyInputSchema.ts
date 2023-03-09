import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
}).strict();

export default VerificationTokenCreateManyInputSchema;
