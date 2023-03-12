import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankUserIdAccountCompoundUniqueInputSchema } from './BankUserIdAccountCompoundUniqueInputSchema';

export const BankWhereUniqueInputSchema: z.ZodType<Prisma.BankWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  userId_account: z.lazy(() => BankUserIdAccountCompoundUniqueInputSchema).optional()
}).strict();

export default BankWhereUniqueInputSchema;
