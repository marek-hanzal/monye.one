import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutFileInputSchema } from './UserCreateWithoutFileInputSchema';
import { UserUncheckedCreateWithoutFileInputSchema } from './UserUncheckedCreateWithoutFileInputSchema';

export const UserCreateOrConnectWithoutFileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFileInputSchema),z.lazy(() => UserUncheckedCreateWithoutFileInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutFileInputSchema;
