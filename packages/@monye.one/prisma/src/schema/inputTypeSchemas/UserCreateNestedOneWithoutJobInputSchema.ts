import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutJobInputSchema } from './UserCreateWithoutJobInputSchema';
import { UserUncheckedCreateWithoutJobInputSchema } from './UserUncheckedCreateWithoutJobInputSchema';
import { UserCreateOrConnectWithoutJobInputSchema } from './UserCreateOrConnectWithoutJobInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutJobInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutJobInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutJobInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutJobInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutJobInputSchema;
