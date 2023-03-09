import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionUpdateWithoutUserInputSchema } from './TransactionUpdateWithoutUserInputSchema';
import { TransactionUncheckedUpdateWithoutUserInputSchema } from './TransactionUncheckedUpdateWithoutUserInputSchema';
import { TransactionCreateWithoutUserInputSchema } from './TransactionCreateWithoutUserInputSchema';
import { TransactionUncheckedCreateWithoutUserInputSchema } from './TransactionUncheckedCreateWithoutUserInputSchema';

export const TransactionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default TransactionUpsertWithWhereUniqueWithoutUserInputSchema;
