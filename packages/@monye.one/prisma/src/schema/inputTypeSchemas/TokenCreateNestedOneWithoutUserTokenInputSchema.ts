import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TokenCreateWithoutUserTokenInputSchema } from './TokenCreateWithoutUserTokenInputSchema';
import { TokenUncheckedCreateWithoutUserTokenInputSchema } from './TokenUncheckedCreateWithoutUserTokenInputSchema';
import { TokenCreateOrConnectWithoutUserTokenInputSchema } from './TokenCreateOrConnectWithoutUserTokenInputSchema';
import { TokenWhereUniqueInputSchema } from './TokenWhereUniqueInputSchema';

export const TokenCreateNestedOneWithoutUserTokenInputSchema: z.ZodType<Prisma.TokenCreateNestedOneWithoutUserTokenInput> = z.object({
  create: z.union([ z.lazy(() => TokenCreateWithoutUserTokenInputSchema),z.lazy(() => TokenUncheckedCreateWithoutUserTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TokenCreateOrConnectWithoutUserTokenInputSchema).optional(),
  connect: z.lazy(() => TokenWhereUniqueInputSchema).optional()
}).strict();

export default TokenCreateNestedOneWithoutUserTokenInputSchema;
