import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountProviderProviderAccountIdCompoundUniqueInputSchema } from './AccountProviderProviderAccountIdCompoundUniqueInputSchema';

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
}).strict();

export default AccountWhereUniqueInputSchema;
