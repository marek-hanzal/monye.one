import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenWhereUniqueInputSchema } from './UserTokenWhereUniqueInputSchema';
import { UserTokenUpdateWithoutUserInputSchema } from './UserTokenUpdateWithoutUserInputSchema';
import { UserTokenUncheckedUpdateWithoutUserInputSchema } from './UserTokenUncheckedUpdateWithoutUserInputSchema';
import { UserTokenCreateWithoutUserInputSchema } from './UserTokenCreateWithoutUserInputSchema';
import { UserTokenUncheckedCreateWithoutUserInputSchema } from './UserTokenUncheckedCreateWithoutUserInputSchema';

export const UserTokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserTokenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserTokenUpdateWithoutUserInputSchema),z.lazy(() => UserTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserTokenCreateWithoutUserInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default UserTokenUpsertWithWhereUniqueWithoutUserInputSchema;
