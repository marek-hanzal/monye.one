import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenWhereUniqueInputSchema } from './UserTokenWhereUniqueInputSchema';
import { UserTokenUpdateWithoutTokenInputSchema } from './UserTokenUpdateWithoutTokenInputSchema';
import { UserTokenUncheckedUpdateWithoutTokenInputSchema } from './UserTokenUncheckedUpdateWithoutTokenInputSchema';

export const UserTokenUpdateWithWhereUniqueWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUpdateWithWhereUniqueWithoutTokenInput> = z.object({
  where: z.lazy(() => UserTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserTokenUpdateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedUpdateWithoutTokenInputSchema) ]),
}).strict();

export default UserTokenUpdateWithWhereUniqueWithoutTokenInputSchema;
