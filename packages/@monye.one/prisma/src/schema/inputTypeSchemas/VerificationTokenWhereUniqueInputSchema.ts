import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenIdentifierTokenCompoundUniqueInputSchema } from './VerificationTokenIdentifierTokenCompoundUniqueInputSchema';

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
}).strict();

export default VerificationTokenWhereUniqueInputSchema;
