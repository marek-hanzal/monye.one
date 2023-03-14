import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenWhereUniqueInputSchema } from './UserTokenWhereUniqueInputSchema';
import { UserTokenUpdateWithoutUserInputSchema } from './UserTokenUpdateWithoutUserInputSchema';
import { UserTokenUncheckedUpdateWithoutUserInputSchema } from './UserTokenUncheckedUpdateWithoutUserInputSchema';

export const UserTokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserTokenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserTokenUpdateWithoutUserInputSchema),z.lazy(() => UserTokenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default UserTokenUpdateWithWhereUniqueWithoutUserInputSchema;
