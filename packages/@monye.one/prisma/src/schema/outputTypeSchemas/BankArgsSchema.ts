import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { BankSelectSchema } from '../inputTypeSchemas/BankSelectSchema';
import { BankIncludeSchema } from '../inputTypeSchemas/BankIncludeSchema';

export const BankArgsSchema: z.ZodType<Prisma.BankArgs> = z.object({
  select: z.lazy(() => BankSelectSchema).optional(),
  include: z.lazy(() => BankIncludeSchema).optional(),
}).strict();

export default BankArgsSchema;
