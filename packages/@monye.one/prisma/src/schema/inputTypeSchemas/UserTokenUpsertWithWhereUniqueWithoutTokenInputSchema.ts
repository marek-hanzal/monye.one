import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenWhereUniqueInputSchema } from './UserTokenWhereUniqueInputSchema';
import { UserTokenUpdateWithoutTokenInputSchema } from './UserTokenUpdateWithoutTokenInputSchema';
import { UserTokenUncheckedUpdateWithoutTokenInputSchema } from './UserTokenUncheckedUpdateWithoutTokenInputSchema';
import { UserTokenCreateWithoutTokenInputSchema } from './UserTokenCreateWithoutTokenInputSchema';
import { UserTokenUncheckedCreateWithoutTokenInputSchema } from './UserTokenUncheckedCreateWithoutTokenInputSchema';

export const UserTokenUpsertWithWhereUniqueWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUpsertWithWhereUniqueWithoutTokenInput> = z.object({
  where: z.lazy(() => UserTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserTokenUpdateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedUpdateWithoutTokenInputSchema) ]),
  create: z.union([ z.lazy(() => UserTokenCreateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema) ]),
}).strict();

export default UserTokenUpsertWithWhereUniqueWithoutTokenInputSchema;
