import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { UserTokenUpdateManyWithoutTokenNestedInputSchema } from './UserTokenUpdateManyWithoutTokenNestedInputSchema';

export const TokenUpdateInputSchema: z.ZodType<Prisma.TokenUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  UserToken: z.lazy(() => UserTokenUpdateManyWithoutTokenNestedInputSchema).optional()
}).strict();

export default TokenUpdateInputSchema;
