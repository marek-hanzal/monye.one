import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutUserTokenNestedInputSchema } from './UserUpdateOneRequiredWithoutUserTokenNestedInputSchema';

export const UserTokenUpdateWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenUpdateWithoutTokenInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserTokenNestedInputSchema).optional(),
}).strict();

export default UserTokenUpdateWithoutTokenInputSchema;
