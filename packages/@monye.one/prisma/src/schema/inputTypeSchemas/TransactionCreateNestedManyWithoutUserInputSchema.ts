import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionCreateWithoutUserInputSchema } from './TransactionCreateWithoutUserInputSchema';
import { TransactionUncheckedCreateWithoutUserInputSchema } from './TransactionUncheckedCreateWithoutUserInputSchema';
import { TransactionCreateOrConnectWithoutUserInputSchema } from './TransactionCreateOrConnectWithoutUserInputSchema';
import { TransactionCreateManyUserInputEnvelopeSchema } from './TransactionCreateManyUserInputEnvelopeSchema';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';

export const TransactionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutUserInputSchema),z.lazy(() => TransactionCreateWithoutUserInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default TransactionCreateNestedManyWithoutUserInputSchema;
