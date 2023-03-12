import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutBankInputSchema } from './UserCreateWithoutBankInputSchema';
import { UserUncheckedCreateWithoutBankInputSchema } from './UserUncheckedCreateWithoutBankInputSchema';
import { UserCreateOrConnectWithoutBankInputSchema } from './UserCreateOrConnectWithoutBankInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutBankInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBankInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBankInputSchema),z.lazy(() => UserUncheckedCreateWithoutBankInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBankInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutBankInputSchema;
