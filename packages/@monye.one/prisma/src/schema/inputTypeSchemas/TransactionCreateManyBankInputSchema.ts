import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJSLikeSchema } from './DecimalJsLikeSchema';

export const TransactionCreateManyBankInputSchema: z.ZodType<Prisma.TransactionCreateManyBankInput> = z.object({
  id: z.string().cuid().optional(),
  reference: z.string(),
  userId: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  variable: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  static: z.string().optional().nullable(),
  date: z.coerce.date(),
  target: z.string().optional().nullable(),
  note: z.string().optional().nullable()
}).strict();

export default TransactionCreateManyBankInputSchema;