import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountCreateNestedManyWithoutUserInputSchema } from './AccountCreateNestedManyWithoutUserInputSchema';
import { SessionCreateNestedManyWithoutUserInputSchema } from './SessionCreateNestedManyWithoutUserInputSchema';
import { UserTokenCreateNestedManyWithoutUserInputSchema } from './UserTokenCreateNestedManyWithoutUserInputSchema';
import { FileCreateNestedManyWithoutUserInputSchema } from './FileCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutJobInputSchema: z.ZodType<Prisma.UserCreateWithoutJobInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutJobInputSchema;
