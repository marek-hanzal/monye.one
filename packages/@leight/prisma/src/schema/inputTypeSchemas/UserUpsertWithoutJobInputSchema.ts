import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutJobInputSchema } from './UserUpdateWithoutJobInputSchema';
import { UserUncheckedUpdateWithoutJobInputSchema } from './UserUncheckedUpdateWithoutJobInputSchema';
import { UserCreateWithoutJobInputSchema } from './UserCreateWithoutJobInputSchema';
import { UserUncheckedCreateWithoutJobInputSchema } from './UserUncheckedCreateWithoutJobInputSchema';

export const UserUpsertWithoutJobInputSchema: z.ZodType<Prisma.UserUpsertWithoutJobInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutJobInputSchema),z.lazy(() => UserUncheckedUpdateWithoutJobInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutJobInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobInputSchema) ]),
}).strict();

export default UserUpsertWithoutJobInputSchema;
