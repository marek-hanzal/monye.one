import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutUserTokenNestedInputSchema } from './UserUpdateOneRequiredWithoutUserTokenNestedInputSchema';
import { TokenUpdateOneRequiredWithoutUserTokenNestedInputSchema } from './TokenUpdateOneRequiredWithoutUserTokenNestedInputSchema';

export const UserTokenUpdateInputSchema: z.ZodType<Prisma.UserTokenUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserTokenNestedInputSchema).optional(),
  token: z.lazy(() => TokenUpdateOneRequiredWithoutUserTokenNestedInputSchema).optional(),
}).strict();

export default UserTokenUpdateInputSchema;
