import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionUncheckedCreateNestedManyWithoutUserInputSchema } from './SessionUncheckedCreateNestedManyWithoutUserInputSchema';
import { UserTokenUncheckedCreateNestedManyWithoutUserInputSchema } from './UserTokenUncheckedCreateNestedManyWithoutUserInputSchema';
import { FileUncheckedCreateNestedManyWithoutUserInputSchema } from './FileUncheckedCreateNestedManyWithoutUserInputSchema';
import { JobUncheckedCreateNestedManyWithoutUserInputSchema } from './JobUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutAccountsInputSchema;
