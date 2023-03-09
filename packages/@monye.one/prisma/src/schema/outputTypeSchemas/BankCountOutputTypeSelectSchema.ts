import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const BankCountOutputTypeSelectSchema: z.ZodType<Prisma.BankCountOutputTypeSelect> = z.object({
  Transaction: z.boolean().optional(),
}).strict();

export default BankCountOutputTypeSelectSchema;
