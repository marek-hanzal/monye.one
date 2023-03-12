import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';

export const KeywordWhereInputSchema: z.ZodType<Prisma.KeywordWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KeywordWhereInputSchema),z.lazy(() => KeywordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KeywordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KeywordWhereInputSchema),z.lazy(() => KeywordWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default KeywordWhereInputSchema;
