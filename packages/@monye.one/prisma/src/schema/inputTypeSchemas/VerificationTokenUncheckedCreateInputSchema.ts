import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
}).strict();

export default VerificationTokenUncheckedCreateInputSchema;
