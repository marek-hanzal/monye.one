import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TokenCreateWithoutUserTokenInputSchema } from './TokenCreateWithoutUserTokenInputSchema';
import { TokenUncheckedCreateWithoutUserTokenInputSchema } from './TokenUncheckedCreateWithoutUserTokenInputSchema';
import { TokenCreateOrConnectWithoutUserTokenInputSchema } from './TokenCreateOrConnectWithoutUserTokenInputSchema';
import { TokenUpsertWithoutUserTokenInputSchema } from './TokenUpsertWithoutUserTokenInputSchema';
import { TokenWhereUniqueInputSchema } from './TokenWhereUniqueInputSchema';
import { TokenUpdateWithoutUserTokenInputSchema } from './TokenUpdateWithoutUserTokenInputSchema';
import { TokenUncheckedUpdateWithoutUserTokenInputSchema } from './TokenUncheckedUpdateWithoutUserTokenInputSchema';

export const TokenUpdateOneRequiredWithoutUserTokenNestedInputSchema: z.ZodType<Prisma.TokenUpdateOneRequiredWithoutUserTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => TokenCreateWithoutUserTokenInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TokenCreateOrConnectWithoutUserTokenInputSchema).optional(),
  upsert: z.lazy(() => TokenUpsertWithoutUserTokenInputSchema).optional(),
  connect: z.lazy(() => TokenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TokenUpdateWithoutUserTokenInputSchema),z.lazy(() => TokenUncheckedUpdateWithoutUserTokenInputSchema) ]).optional(),
}).strict();

export default TokenUpdateOneRequiredWithoutUserTokenNestedInputSchema;
