import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountScalarWhereInputSchema } from './AccountScalarWhereInputSchema';
import { AccountUpdateManyMutationInputSchema } from './AccountUpdateManyMutationInputSchema';
import { AccountUncheckedUpdateManyWithoutAccountsInputSchema } from './AccountUncheckedUpdateManyWithoutAccountsInputSchema';

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutAccountsInputSchema) ]),
}).strict();

export default AccountUpdateManyWithWhereWithoutUserInputSchema;
