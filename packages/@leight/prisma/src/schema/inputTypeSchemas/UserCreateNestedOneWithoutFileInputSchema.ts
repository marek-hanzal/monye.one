import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutFileInputSchema } from './UserCreateWithoutFileInputSchema';
import { UserUncheckedCreateWithoutFileInputSchema } from './UserUncheckedCreateWithoutFileInputSchema';
import { UserCreateOrConnectWithoutFileInputSchema } from './UserCreateOrConnectWithoutFileInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutFileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFileInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutFileInputSchema;
