import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenScalarWhereInputSchema } from './UserTokenScalarWhereInputSchema';
import { UserTokenUpdateManyMutationInputSchema } from './UserTokenUpdateManyMutationInputSchema';
import { UserTokenUncheckedUpdateManyWithoutUserTokenInputSchema } from './UserTokenUncheckedUpdateManyWithoutUserTokenInputSchema';

export const UserTokenUpdateManyWithWhereWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUpdateManyWithWhereWithoutTokenInput> = z.object({
  where: z.lazy(() => UserTokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserTokenUpdateManyMutationInputSchema),z.lazy(() => UserTokenUncheckedUpdateManyWithoutUserTokenInputSchema) ]),
}).strict();

export default UserTokenUpdateManyWithWhereWithoutTokenInputSchema;
