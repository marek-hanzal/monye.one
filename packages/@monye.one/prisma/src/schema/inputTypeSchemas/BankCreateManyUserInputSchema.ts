import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const BankCreateManyUserInputSchema: z.ZodType<Prisma.BankCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  account: z.string(),
}).strict();

export default BankCreateManyUserInputSchema;
