import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutSessionsInputSchema } from './UserUpdateWithoutSessionsInputSchema';
import { UserUncheckedUpdateWithoutSessionsInputSchema } from './UserUncheckedUpdateWithoutSessionsInputSchema';
import { UserCreateWithoutSessionsInputSchema } from './UserCreateWithoutSessionsInputSchema';
import { UserUncheckedCreateWithoutSessionsInputSchema } from './UserUncheckedCreateWithoutSessionsInputSchema';

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export default UserUpsertWithoutSessionsInputSchema;
