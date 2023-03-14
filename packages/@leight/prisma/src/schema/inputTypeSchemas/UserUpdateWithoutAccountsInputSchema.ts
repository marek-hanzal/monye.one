import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { SessionUpdateManyWithoutUserNestedInputSchema } from './SessionUpdateManyWithoutUserNestedInputSchema';
import { UserTokenUpdateManyWithoutUserNestedInputSchema } from './UserTokenUpdateManyWithoutUserNestedInputSchema';
import { FileUpdateManyWithoutUserNestedInputSchema } from './FileUpdateManyWithoutUserNestedInputSchema';
import { JobUpdateManyWithoutUserNestedInputSchema } from './JobUpdateManyWithoutUserNestedInputSchema';

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  UserToken: z.lazy(() => UserTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  File: z.lazy(() => FileUpdateManyWithoutUserNestedInputSchema).optional(),
  Job: z.lazy(() => JobUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export default UserUpdateWithoutAccountsInputSchema;
