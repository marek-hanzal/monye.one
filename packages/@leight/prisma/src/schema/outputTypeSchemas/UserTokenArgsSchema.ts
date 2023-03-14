import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenSelectSchema } from '../inputTypeSchemas/UserTokenSelectSchema';
import { UserTokenIncludeSchema } from '../inputTypeSchemas/UserTokenIncludeSchema';

export const UserTokenArgsSchema: z.ZodType<Prisma.UserTokenArgs> = z.object({
  select: z.lazy(() => UserTokenSelectSchema).optional(),
  include: z.lazy(() => UserTokenIncludeSchema).optional(),
}).strict();

export default UserTokenArgsSchema;
