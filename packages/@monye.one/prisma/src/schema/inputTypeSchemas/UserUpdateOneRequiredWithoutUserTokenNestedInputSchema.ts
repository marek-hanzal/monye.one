import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutUserTokenInputSchema } from './UserCreateWithoutUserTokenInputSchema';
import { UserUncheckedCreateWithoutUserTokenInputSchema } from './UserUncheckedCreateWithoutUserTokenInputSchema';
import { UserCreateOrConnectWithoutUserTokenInputSchema } from './UserCreateOrConnectWithoutUserTokenInputSchema';
import { UserUpsertWithoutUserTokenInputSchema } from './UserUpsertWithoutUserTokenInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutUserTokenInputSchema } from './UserUpdateWithoutUserTokenInputSchema';
import { UserUncheckedUpdateWithoutUserTokenInputSchema } from './UserUncheckedUpdateWithoutUserTokenInputSchema';

export const UserUpdateOneRequiredWithoutUserTokenNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUserTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserTokenInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUserTokenInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutUserTokenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserTokenInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutUserTokenNestedInputSchema;
