import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionCreateWithoutBankInputSchema } from './TransactionCreateWithoutBankInputSchema';
import { TransactionUncheckedCreateWithoutBankInputSchema } from './TransactionUncheckedCreateWithoutBankInputSchema';
import { TransactionCreateOrConnectWithoutBankInputSchema } from './TransactionCreateOrConnectWithoutBankInputSchema';
import { TransactionCreateManyBankInputEnvelopeSchema } from './TransactionCreateManyBankInputEnvelopeSchema';
import { TransactionWhereUniqueInputSchema } from './TransactionWhereUniqueInputSchema';

export const TransactionCreateNestedManyWithoutBankInputSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutBankInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutBankInputSchema),z.lazy(() => TransactionCreateWithoutBankInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutBankInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutBankInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyBankInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default TransactionCreateNestedManyWithoutBankInputSchema;
