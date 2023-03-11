import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJSLikeSchema } from './DecimalJsLikeSchema';
import { UserCreateNestedOneWithoutTransactionInputSchema } from './UserCreateNestedOneWithoutTransactionInputSchema';

export const TransactionCreateWithoutBankInputSchema: z.ZodType<Prisma.TransactionCreateWithoutBankInput> = z.object({
  id: z.string().optional(),
  reference: z.string(),
  amount: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  variable: z.string().optional().nullable(),
  symbol: z.string().optional().nullable(),
  static: z.string().optional().nullable(),
  date: z.coerce.date(),
  target: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutTransactionInputSchema),
}).strict();

export default TransactionCreateWithoutBankInputSchema;
