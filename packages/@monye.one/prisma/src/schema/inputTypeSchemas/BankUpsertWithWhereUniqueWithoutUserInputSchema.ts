import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankWhereUniqueInputSchema } from './BankWhereUniqueInputSchema';
import { BankUpdateWithoutUserInputSchema } from './BankUpdateWithoutUserInputSchema';
import { BankUncheckedUpdateWithoutUserInputSchema } from './BankUncheckedUpdateWithoutUserInputSchema';
import { BankCreateWithoutUserInputSchema } from './BankCreateWithoutUserInputSchema';
import { BankUncheckedCreateWithoutUserInputSchema } from './BankUncheckedCreateWithoutUserInputSchema';

export const BankUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BankUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BankWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BankUpdateWithoutUserInputSchema),z.lazy(() => BankUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => BankCreateWithoutUserInputSchema),z.lazy(() => BankUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default BankUpsertWithWhereUniqueWithoutUserInputSchema;
