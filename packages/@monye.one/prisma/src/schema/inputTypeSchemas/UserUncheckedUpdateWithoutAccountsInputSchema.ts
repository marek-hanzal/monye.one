import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { SessionUncheckedUpdateManyWithoutUserNestedInputSchema } from './SessionUncheckedUpdateManyWithoutUserNestedInputSchema';
import { UserTokenUncheckedUpdateManyWithoutUserNestedInputSchema } from './UserTokenUncheckedUpdateManyWithoutUserNestedInputSchema';
import { TransactionUncheckedUpdateManyWithoutUserNestedInputSchema } from './TransactionUncheckedUpdateManyWithoutUserNestedInputSchema';
import { JobUncheckedUpdateManyWithoutUserNestedInputSchema } from './JobUncheckedUpdateManyWithoutUserNestedInputSchema';
import { FileUncheckedUpdateManyWithoutUserNestedInputSchema } from './FileUncheckedUpdateManyWithoutUserNestedInputSchema';
import { BankUncheckedUpdateManyWithoutUserNestedInputSchema } from './BankUncheckedUpdateManyWithoutUserNestedInputSchema';

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export default UserUncheckedUpdateWithoutAccountsInputSchema;