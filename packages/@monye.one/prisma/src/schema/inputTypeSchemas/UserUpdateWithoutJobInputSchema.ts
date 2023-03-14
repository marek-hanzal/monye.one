import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { AccountUpdateManyWithoutUserNestedInputSchema } from './AccountUpdateManyWithoutUserNestedInputSchema';
import { SessionUpdateManyWithoutUserNestedInputSchema } from './SessionUpdateManyWithoutUserNestedInputSchema';
import { UserTokenUpdateManyWithoutUserNestedInputSchema } from './UserTokenUpdateManyWithoutUserNestedInputSchema';
import { TransactionUpdateManyWithoutUserNestedInputSchema } from './TransactionUpdateManyWithoutUserNestedInputSchema';
import { FileUpdateManyWithoutUserNestedInputSchema } from './FileUpdateManyWithoutUserNestedInputSchema';
import { BankUpdateManyWithoutUserNestedInputSchema } from './BankUpdateManyWithoutUserNestedInputSchema';

export const UserUpdateWithoutJobInputSchema: z.ZodType<Prisma.UserUpdateWithoutJobInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  Transaction: z.lazy(() => TransactionUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional(),
  Bank: z.lazy(() => BankUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export default UserUpdateWithoutJobInputSchema;