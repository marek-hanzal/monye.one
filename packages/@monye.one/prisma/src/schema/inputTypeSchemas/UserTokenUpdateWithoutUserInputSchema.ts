import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { TokenUpdateOneRequiredWithoutUserTokenNestedInputSchema } from './TokenUpdateOneRequiredWithoutUserTokenNestedInputSchema';

export const UserTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserTokenUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.lazy(() => TokenUpdateOneRequiredWithoutUserTokenNestedInputSchema).optional(),
}).strict();

export default UserTokenUpdateWithoutUserInputSchema;
