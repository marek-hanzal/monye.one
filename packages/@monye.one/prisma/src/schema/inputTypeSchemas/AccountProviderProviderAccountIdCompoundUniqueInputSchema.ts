import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string(),
}).strict();

export default AccountProviderProviderAccountIdCompoundUniqueInputSchema;
