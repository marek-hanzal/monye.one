import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BankScalarWhereInputSchema } from './BankScalarWhereInputSchema';
import { BankUpdateManyMutationInputSchema } from './BankUpdateManyMutationInputSchema';
import { BankUncheckedUpdateManyWithoutBankInputSchema } from './BankUncheckedUpdateManyWithoutBankInputSchema';

export const BankUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.BankUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BankScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BankUpdateManyMutationInputSchema),z.lazy(() => BankUncheckedUpdateManyWithoutBankInputSchema) ]),
}).strict();

export default BankUpdateManyWithWhereWithoutUserInputSchema;
