import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountUncheckedCreateNestedManyWithoutUserInputSchema } from './AccountUncheckedCreateNestedManyWithoutUserInputSchema';
import { SessionUncheckedCreateNestedManyWithoutUserInputSchema } from './SessionUncheckedCreateNestedManyWithoutUserInputSchema';
import { UserTokenUncheckedCreateNestedManyWithoutUserInputSchema } from './UserTokenUncheckedCreateNestedManyWithoutUserInputSchema';
import { JobUncheckedCreateNestedManyWithoutUserInputSchema } from './JobUncheckedCreateNestedManyWithoutUserInputSchema';
import { FileUncheckedCreateNestedManyWithoutUserInputSchema } from './FileUncheckedCreateNestedManyWithoutUserInputSchema';
import { BankUncheckedCreateNestedManyWithoutUserInputSchema } from './BankUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutTransactionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTransactionInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  File: z.lazy(() => FileUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export default UserUncheckedCreateWithoutTransactionInputSchema;
