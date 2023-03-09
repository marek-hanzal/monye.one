import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { UserTokenUncheckedUpdateManyWithoutTokenNestedInputSchema } from './UserTokenUncheckedUpdateManyWithoutTokenNestedInputSchema';

export const TokenUncheckedUpdateInputSchema: z.ZodType<Prisma.TokenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  UserToken: z.lazy(() => UserTokenUncheckedUpdateManyWithoutTokenNestedInputSchema).optional(),
}).strict();

export default TokenUncheckedUpdateInputSchema;
