import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenWhereUniqueInputSchema } from './UserTokenWhereUniqueInputSchema';
import { UserTokenCreateWithoutTokenInputSchema } from './UserTokenCreateWithoutTokenInputSchema';
import { UserTokenUncheckedCreateWithoutTokenInputSchema } from './UserTokenUncheckedCreateWithoutTokenInputSchema';

export const UserTokenCreateOrConnectWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenCreateOrConnectWithoutTokenInput> = z.object({
  where: z.lazy(() => UserTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserTokenCreateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema) ]),
}).strict();

export default UserTokenCreateOrConnectWithoutTokenInputSchema;
