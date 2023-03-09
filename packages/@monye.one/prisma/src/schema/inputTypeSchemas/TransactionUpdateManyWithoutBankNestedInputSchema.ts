import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionCreateWithoutBankInputSchema } from './TransactionCreateWithoutBankInputSchema';
import { TransactionUncheckedCreateWithoutBankInputSchema } from './TransactionUncheckedCreateWithoutBankInputSchema';
import { TransactionCreateOrConnectWithoutBankInputSchema } from './TransactionCreateOrConnectWithoutBankInputSchema';
import { TransactionUpsertWithWhereUniqueWithoutBankInputSchema } from './TransactionUpsertWithWhereUniqueWithoutBankInputSchema';
import { TransactionCreateManyBankInputEnvelopeSchema } from './TransactionCreateManyBankInputEnvelopeSchema';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';
import { TransactionUpdateWithWhereUniqueWithoutBankInputSchema } from './TransactionUpdateWithWhereUniqueWithoutBankInputSchema';
import { TransactionUpdateManyWithWhereWithoutBankInputSchema } from './TransactionUpdateManyWithWhereWithoutBankInputSchema';
import { TransactionScalarWhereInputSchema } from './TransactionScalarWhereInputSchema';

export const TransactionUpdateManyWithoutBankNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutBankNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutBankInputSchema),z.lazy(() => TransactionCreateWithoutBankInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutBankInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutBankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyBankInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutBankInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutBankInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutBankInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutBankInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default TransactionUpdateManyWithoutBankNestedInputSchema;
