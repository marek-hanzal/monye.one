import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankUpdateManyMutationInputSchema } from '../inputTypeSchemas/BankUpdateManyMutationInputSchema'
import { BankUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/BankUncheckedUpdateManyInputSchema'
import { BankWhereInputSchema } from '../inputTypeSchemas/BankWhereInputSchema'

export const BankUpdateManyArgsSchema: z.ZodType<Prisma.BankUpdateManyArgs> = z.object({
  data: z.union([ BankUpdateManyMutationInputSchema,BankUncheckedUpdateManyInputSchema ]),
  where: BankWhereInputSchema.optional(),
}).strict()

export default BankUpdateManyArgsSchema;
