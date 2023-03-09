import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutTransactionInputSchema } from './UserCreateWithoutTransactionInputSchema';
import { UserUncheckedCreateWithoutTransactionInputSchema } from './UserUncheckedCreateWithoutTransactionInputSchema';
import { UserCreateOrConnectWithoutTransactionInputSchema } from './UserCreateOrConnectWithoutTransactionInputSchema';
import { UserUpsertWithoutTransactionInputSchema } from './UserUpsertWithoutTransactionInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutTransactionInputSchema } from './UserUpdateWithoutTransactionInputSchema';
import { UserUncheckedUpdateWithoutTransactionInputSchema } from './UserUncheckedUpdateWithoutTransactionInputSchema';

export const UserUpdateOneRequiredWithoutTransactionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutTransactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTransactionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTransactionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTransactionInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutTransactionNestedInputSchema;
