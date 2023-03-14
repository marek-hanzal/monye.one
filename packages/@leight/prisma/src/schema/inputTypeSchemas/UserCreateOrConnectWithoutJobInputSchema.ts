import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutJobInputSchema } from './UserCreateWithoutJobInputSchema';
import { UserUncheckedCreateWithoutJobInputSchema } from './UserUncheckedCreateWithoutJobInputSchema';

export const UserCreateOrConnectWithoutJobInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutJobInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutJobInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutJobInputSchema;
