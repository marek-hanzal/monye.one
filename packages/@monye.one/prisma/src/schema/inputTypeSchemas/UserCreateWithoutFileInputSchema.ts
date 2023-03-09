import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountCreateNestedManyWithoutUserInputSchema } from './AccountCreateNestedManyWithoutUserInputSchema';
import { SessionCreateNestedManyWithoutUserInputSchema } from './SessionCreateNestedManyWithoutUserInputSchema';
import { UserTokenCreateNestedManyWithoutUserInputSchema } from './UserTokenCreateNestedManyWithoutUserInputSchema';
import { TransactionCreateNestedManyWithoutUserInputSchema } from './TransactionCreateNestedManyWithoutUserInputSchema';
import { JobCreateNestedManyWithoutUserInputSchema } from './JobCreateNestedManyWithoutUserInputSchema';
import { BankCreateNestedManyWithoutUserInputSchema } from './BankCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutFileInputSchema: z.ZodType<Prisma.UserCreateWithoutFileInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export default UserCreateWithoutFileInputSchema;
