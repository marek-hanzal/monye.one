import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountCreateNestedManyWithoutUserInputSchema } from './AccountCreateNestedManyWithoutUserInputSchema';
import { UserTokenCreateNestedManyWithoutUserInputSchema } from './UserTokenCreateNestedManyWithoutUserInputSchema';
import { FileCreateNestedManyWithoutUserInputSchema } from './FileCreateNestedManyWithoutUserInputSchema';
import { JobCreateNestedManyWithoutUserInputSchema } from './JobCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutSessionsInputSchema;
