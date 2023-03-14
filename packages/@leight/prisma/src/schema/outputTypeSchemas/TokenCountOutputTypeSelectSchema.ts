import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TokenCountOutputTypeSelectSchema: z.ZodType<Prisma.TokenCountOutputTypeSelect> = z.object({
  UserToken: z.boolean().optional(),
}).strict();

export default TokenCountOutputTypeSelectSchema;
