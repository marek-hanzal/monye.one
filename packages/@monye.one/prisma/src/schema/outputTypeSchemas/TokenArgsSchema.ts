import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TokenSelectSchema } from '../inputTypeSchemas/TokenSelectSchema';
import { TokenIncludeSchema } from '../inputTypeSchemas/TokenIncludeSchema';

export const TokenArgsSchema: z.ZodType<Prisma.TokenArgs> = z.object({
  select: z.lazy(() => TokenSelectSchema).optional(),
  include: z.lazy(() => TokenIncludeSchema).optional(),
}).strict();

export default TokenArgsSchema;
