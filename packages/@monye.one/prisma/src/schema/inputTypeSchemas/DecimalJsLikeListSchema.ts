import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const DecimalJSLikeListSchema: z.ZodType<Prisma.DecimalJsLike[]> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), }).array();

export default DecimalJSLikeListSchema;
