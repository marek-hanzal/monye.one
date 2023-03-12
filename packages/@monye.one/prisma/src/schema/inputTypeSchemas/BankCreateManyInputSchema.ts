import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const BankCreateManyInputSchema: z.ZodType<Prisma.BankCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  account: z.string()
}).strict();

export default BankCreateManyInputSchema;
