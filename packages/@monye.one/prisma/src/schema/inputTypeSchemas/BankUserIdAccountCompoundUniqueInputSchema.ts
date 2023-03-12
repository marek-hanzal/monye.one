import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const BankUserIdAccountCompoundUniqueInputSchema: z.ZodType<Prisma.BankUserIdAccountCompoundUniqueInput> = z.object({
  userId: z.string(),
  account: z.string()
}).strict();

export default BankUserIdAccountCompoundUniqueInputSchema;
