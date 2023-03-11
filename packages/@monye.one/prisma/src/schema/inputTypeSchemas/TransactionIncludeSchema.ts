import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { BankArgsSchema } from "../outputTypeSchemas/BankArgsSchema"

export const TransactionIncludeSchema: z.ZodType<Prisma.TransactionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  bank: z.union([z.boolean(),z.lazy(() => BankArgsSchema)]).optional(),
}).strict()

export default TransactionIncludeSchema;
