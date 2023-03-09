import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutFileInputSchema } from './UserCreateWithoutFileInputSchema';
import { UserUncheckedCreateWithoutFileInputSchema } from './UserUncheckedCreateWithoutFileInputSchema';
import { UserCreateOrConnectWithoutFileInputSchema } from './UserCreateOrConnectWithoutFileInputSchema';
import { UserUpsertWithoutFileInputSchema } from './UserUpsertWithoutFileInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutFileInputSchema } from './UserUpdateWithoutFileInputSchema';
import { UserUncheckedUpdateWithoutFileInputSchema } from './UserUncheckedUpdateWithoutFileInputSchema';

export const UserUpdateOneWithoutFileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutFileNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFileInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutFileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFileInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneWithoutFileNestedInputSchema;
