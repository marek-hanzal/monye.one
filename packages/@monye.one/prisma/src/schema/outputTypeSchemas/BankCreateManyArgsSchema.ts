import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankCreateManyInputSchema } from '../inputTypeSchemas/BankCreateManyInputSchema'

export const BankCreateManyArgsSchema: z.ZodType<Prisma.BankCreateManyArgs> = z.object({
  data: BankCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default BankCreateManyArgsSchema;
