import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenUncheckedCreateNestedManyWithoutTokenInputSchema } from './UserTokenUncheckedCreateNestedManyWithoutTokenInputSchema';

export const TokenUncheckedCreateInputSchema: z.ZodType<Prisma.TokenUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  UserToken: z.lazy(() => UserTokenUncheckedCreateNestedManyWithoutTokenInputSchema).optional()
}).strict();

export default TokenUncheckedCreateInputSchema;
