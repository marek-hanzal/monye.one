import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutBankInputSchema } from './UserCreateWithoutBankInputSchema';
import { UserUncheckedCreateWithoutBankInputSchema } from './UserUncheckedCreateWithoutBankInputSchema';

export const UserCreateOrConnectWithoutBankInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBankInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBankInputSchema),z.lazy(() => UserUncheckedCreateWithoutBankInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutBankInputSchema;
