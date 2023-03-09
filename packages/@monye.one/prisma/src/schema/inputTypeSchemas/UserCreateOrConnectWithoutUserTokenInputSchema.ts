import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutUserTokenInputSchema } from './UserCreateWithoutUserTokenInputSchema';
import { UserUncheckedCreateWithoutUserTokenInputSchema } from './UserUncheckedCreateWithoutUserTokenInputSchema';

export const UserCreateOrConnectWithoutUserTokenInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserTokenInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUserTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTokenInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutUserTokenInputSchema;
