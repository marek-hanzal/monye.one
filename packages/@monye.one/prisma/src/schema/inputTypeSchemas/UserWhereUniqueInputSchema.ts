import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional()
}).strict();

export default UserWhereUniqueInputSchema;
