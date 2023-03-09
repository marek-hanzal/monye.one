import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string(),
}).strict();

export default VerificationTokenIdentifierTokenCompoundUniqueInputSchema;
