import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutFileInputSchema } from './UserUpdateWithoutFileInputSchema';
import { UserUncheckedUpdateWithoutFileInputSchema } from './UserUncheckedUpdateWithoutFileInputSchema';
import { UserCreateWithoutFileInputSchema } from './UserCreateWithoutFileInputSchema';
import { UserUncheckedCreateWithoutFileInputSchema } from './UserUncheckedCreateWithoutFileInputSchema';

export const UserUpsertWithoutFileInputSchema: z.ZodType<Prisma.UserUpsertWithoutFileInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]),
}).strict();

export default UserUpsertWithoutFileInputSchema;
