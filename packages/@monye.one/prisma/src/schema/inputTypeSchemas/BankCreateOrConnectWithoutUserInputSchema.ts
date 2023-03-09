import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankWhereUniqueInputSchema } from './BankWhereUniqueInputSchema';
import { BankCreateWithoutUserInputSchema } from './BankCreateWithoutUserInputSchema';
import { BankUncheckedCreateWithoutUserInputSchema } from './BankUncheckedCreateWithoutUserInputSchema';

export const BankCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.BankCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BankWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BankCreateWithoutUserInputSchema),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default BankCreateOrConnectWithoutUserInputSchema;
