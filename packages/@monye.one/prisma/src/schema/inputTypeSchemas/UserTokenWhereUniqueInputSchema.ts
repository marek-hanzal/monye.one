import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenUserIdTokenIdCompoundUniqueInputSchema } from './UserTokenUserIdTokenIdCompoundUniqueInputSchema';

export const UserTokenWhereUniqueInputSchema: z.ZodType<Prisma.UserTokenWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  userId_tokenId: z.lazy(() => UserTokenUserIdTokenIdCompoundUniqueInputSchema).optional(),
}).strict();

export default UserTokenWhereUniqueInputSchema;
