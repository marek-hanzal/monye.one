import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutTransactionInputSchema } from './UserCreateWithoutTransactionInputSchema';
import { UserUncheckedCreateWithoutTransactionInputSchema } from './UserUncheckedCreateWithoutTransactionInputSchema';

export const UserCreateOrConnectWithoutTransactionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTransactionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutTransactionInputSchema;
