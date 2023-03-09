import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankCreateWithoutUserInputSchema } from './BankCreateWithoutUserInputSchema';
import { BankUncheckedCreateWithoutUserInputSchema } from './BankUncheckedCreateWithoutUserInputSchema';
import { BankCreateOrConnectWithoutUserInputSchema } from './BankCreateOrConnectWithoutUserInputSchema';
import { BankCreateManyUserInputEnvelopeSchema } from './BankCreateManyUserInputEnvelopeSchema';
import { BankWhereUniqueInputSchema } from './BankWhereUniqueInputSchema';

export const BankCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BankCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BankCreateWithoutUserInputSchema),z.lazy(() => BankCreateWithoutUserInputSchema).array(),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankCreateOrConnectWithoutUserInputSchema),z.lazy(() => BankCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BankWhereUniqueInputSchema),z.lazy(() => BankWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default BankCreateNestedManyWithoutUserInputSchema;
