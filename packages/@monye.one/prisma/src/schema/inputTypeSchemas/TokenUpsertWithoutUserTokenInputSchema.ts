import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TokenUpdateWithoutUserTokenInputSchema } from './TokenUpdateWithoutUserTokenInputSchema';
import { TokenUncheckedUpdateWithoutUserTokenInputSchema } from './TokenUncheckedUpdateWithoutUserTokenInputSchema';
import { TokenCreateWithoutUserTokenInputSchema } from './TokenCreateWithoutUserTokenInputSchema';
import { TokenUncheckedCreateWithoutUserTokenInputSchema } from './TokenUncheckedCreateWithoutUserTokenInputSchema';

export const TokenUpsertWithoutUserTokenInputSchema: z.ZodType<Prisma.TokenUpsertWithoutUserTokenInput> = z.object({
  update: z.union([ z.lazy(() => TokenUpdateWithoutUserTokenInputSchema),z.lazy(() => TokenUncheckedUpdateWithoutUserTokenInputSchema) ]),
  create: z.union([ z.lazy(() => TokenCreateWithoutUserTokenInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserTokenInputSchema) ]),
}).strict();

export default TokenUpsertWithoutUserTokenInputSchema;
