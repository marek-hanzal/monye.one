import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutTransactionInputSchema } from './UserCreateWithoutTransactionInputSchema';
import { UserUncheckedCreateWithoutTransactionInputSchema } from './UserUncheckedCreateWithoutTransactionInputSchema';
import { UserCreateOrConnectWithoutTransactionInputSchema } from './UserCreateOrConnectWithoutTransactionInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutTransactionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTransactionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export default UserCreateNestedOneWithoutTransactionInputSchema;
