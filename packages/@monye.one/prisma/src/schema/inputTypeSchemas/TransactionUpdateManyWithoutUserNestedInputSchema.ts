import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionCreateWithoutUserInputSchema } from './TransactionCreateWithoutUserInputSchema';
import { TransactionUncheckedCreateWithoutUserInputSchema } from './TransactionUncheckedCreateWithoutUserInputSchema';
import { TransactionCreateOrConnectWithoutUserInputSchema } from './TransactionCreateOrConnectWithoutUserInputSchema';
import { TransactionUpsertWithWhereUniqueWithoutUserInputSchema } from './TransactionUpsertWithWhereUniqueWithoutUserInputSchema';
import { TransactionCreateManyUserInputEnvelopeSchema } from './TransactionCreateManyUserInputEnvelopeSchema';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionUpdateWithWhereUniqueWithoutUserInputSchema } from './TransactionUpdateWithWhereUniqueWithoutUserInputSchema';
import { TransactionUpdateManyWithWhereWithoutUserInputSchema } from './TransactionUpdateManyWithWhereWithoutUserInputSchema';
import { TransactionScalarWhereInputSchema } from './TransactionScalarWhereInputSchema';

export const TransactionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutUserInputSchema),z.lazy(() => TransactionCreateWithoutUserInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default TransactionUpdateManyWithoutUserNestedInputSchema;
