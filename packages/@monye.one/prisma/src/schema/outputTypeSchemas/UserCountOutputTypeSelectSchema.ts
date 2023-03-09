import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  UserToken: z.boolean().optional(),
  Transaction: z.boolean().optional(),
  Job: z.boolean().optional(),
  File: z.boolean().optional(),
  Bank: z.boolean().optional(),
}).strict();

export default UserCountOutputTypeSelectSchema;
