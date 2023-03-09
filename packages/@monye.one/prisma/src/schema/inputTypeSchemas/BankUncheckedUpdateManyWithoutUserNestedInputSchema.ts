import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankCreateWithoutUserInputSchema } from './BankCreateWithoutUserInputSchema';
import { BankUncheckedCreateWithoutUserInputSchema } from './BankUncheckedCreateWithoutUserInputSchema';
import { BankCreateOrConnectWithoutUserInputSchema } from './BankCreateOrConnectWithoutUserInputSchema';
import { BankUpsertWithWhereUniqueWithoutUserInputSchema } from './BankUpsertWithWhereUniqueWithoutUserInputSchema';
import { BankCreateManyUserInputEnvelopeSchema } from './BankCreateManyUserInputEnvelopeSchema';
import { BankWhereUniqueInputSchema } from './BankWhereUniqueInputSchema';
import { BankUpdateWithWhereUniqueWithoutUserInputSchema } from './BankUpdateWithWhereUniqueWithoutUserInputSchema';
import { BankUpdateManyWithWhereWithoutUserInputSchema } from './BankUpdateManyWithWhereWithoutUserInputSchema';
import { BankScalarWhereInputSchema } from './BankScalarWhereInputSchema';

export const BankUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BankUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BankCreateWithoutUserInputSchema),z.lazy(() => BankCreateWithoutUserInputSchema).array(),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankCreateOrConnectWithoutUserInputSchema),z.lazy(() => BankCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BankUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BankUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BankUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BankUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BankUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BankUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BankScalarWhereInputSchema),z.lazy(() => BankScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default BankUncheckedUpdateManyWithoutUserNestedInputSchema;
