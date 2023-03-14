import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountCreateNestedManyWithoutUserInputSchema } from './AccountCreateNestedManyWithoutUserInputSchema';
import { SessionCreateNestedManyWithoutUserInputSchema } from './SessionCreateNestedManyWithoutUserInputSchema';
import { UserTokenCreateNestedManyWithoutUserInputSchema } from './UserTokenCreateNestedManyWithoutUserInputSchema';
import { FileCreateNestedManyWithoutUserInputSchema } from './FileCreateNestedManyWithoutUserInputSchema';
import { JobCreateNestedManyWithoutUserInputSchema } from './JobCreateNestedManyWithoutUserInputSchema';

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateInputSchema;
