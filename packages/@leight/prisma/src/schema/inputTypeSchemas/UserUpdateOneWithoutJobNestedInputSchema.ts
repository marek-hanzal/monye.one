import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutJobInputSchema } from './UserCreateWithoutJobInputSchema';
import { UserUncheckedCreateWithoutJobInputSchema } from './UserUncheckedCreateWithoutJobInputSchema';
import { UserCreateOrConnectWithoutJobInputSchema } from './UserCreateOrConnectWithoutJobInputSchema';
import { UserUpsertWithoutJobInputSchema } from './UserUpsertWithoutJobInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutJobInputSchema } from './UserUpdateWithoutJobInputSchema';
import { UserUncheckedUpdateWithoutJobInputSchema } from './UserUncheckedUpdateWithoutJobInputSchema';

export const UserUpdateOneWithoutJobNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutJobNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutJobInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutJobInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutJobInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutJobInputSchema),z.lazy(() => UserUncheckedUpdateWithoutJobInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneWithoutJobNestedInputSchema;
