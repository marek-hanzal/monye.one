import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountUncheckedCreateNestedManyWithoutUserInputSchema } from './AccountUncheckedCreateNestedManyWithoutUserInputSchema';
import { UserTokenUncheckedCreateNestedManyWithoutUserInputSchema } from './UserTokenUncheckedCreateNestedManyWithoutUserInputSchema';
import { TransactionUncheckedCreateNestedManyWithoutUserInputSchema } from './TransactionUncheckedCreateNestedManyWithoutUserInputSchema';
import { JobUncheckedCreateNestedManyWithoutUserInputSchema } from './JobUncheckedCreateNestedManyWithoutUserInputSchema';
import { FileUncheckedCreateNestedManyWithoutUserInputSchema } from './FileUncheckedCreateNestedManyWithoutUserInputSchema';
import { BankUncheckedCreateNestedManyWithoutUserInputSchema } from './BankUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutSessionsInputSchema;