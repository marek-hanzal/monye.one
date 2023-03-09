import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankWhereUniqueInputSchema } from './BankWhereUniqueInputSchema';
import { BankUpdateWithoutUserInputSchema } from './BankUpdateWithoutUserInputSchema';
import { BankUncheckedUpdateWithoutUserInputSchema } from './BankUncheckedUpdateWithoutUserInputSchema';

export const BankUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BankUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BankWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BankUpdateWithoutUserInputSchema),z.lazy(() => BankUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default BankUpdateWithWhereUniqueWithoutUserInputSchema;
