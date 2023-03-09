import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionUpdateWithoutUserInputSchema } from './TransactionUpdateWithoutUserInputSchema';
import { TransactionUncheckedUpdateWithoutUserInputSchema } from './TransactionUncheckedUpdateWithoutUserInputSchema';

export const TransactionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default TransactionUpdateWithWhereUniqueWithoutUserInputSchema;
