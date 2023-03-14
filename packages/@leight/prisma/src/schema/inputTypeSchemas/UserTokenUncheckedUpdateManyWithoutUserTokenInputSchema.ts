import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';

export const UserTokenUncheckedUpdateManyWithoutUserTokenInputSchema: z.ZodType<Prisma.UserTokenUncheckedUpdateManyWithoutUserTokenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default UserTokenUncheckedUpdateManyWithoutUserTokenInputSchema;
