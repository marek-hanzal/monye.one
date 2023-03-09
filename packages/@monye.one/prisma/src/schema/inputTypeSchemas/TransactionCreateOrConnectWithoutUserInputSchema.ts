import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionCreateWithoutUserInputSchema } from './TransactionCreateWithoutUserInputSchema';
import { TransactionUncheckedCreateWithoutUserInputSchema } from './TransactionUncheckedCreateWithoutUserInputSchema';

export const TransactionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default TransactionCreateOrConnectWithoutUserInputSchema;
