import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankWhereInputSchema } from '../inputTypeSchemas/BankWhereInputSchema'

export const BankDeleteManyArgsSchema: z.ZodType<Prisma.BankDeleteManyArgs> = z.object({
  where: BankWhereInputSchema.optional(),
}).strict()

export default BankDeleteManyArgsSchema;
