import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { TokenArgsSchema } from "../outputTypeSchemas/TokenArgsSchema"

export const UserTokenSelectSchema: z.ZodType<Prisma.UserTokenSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  tokenId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  token: z.union([z.boolean(),z.lazy(() => TokenArgsSchema)]).optional(),
}).strict()

export default UserTokenSelectSchema;
