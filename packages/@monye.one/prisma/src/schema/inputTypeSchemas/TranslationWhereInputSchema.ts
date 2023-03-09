import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';

export const TranslationWhereInputSchema: z.ZodType<Prisma.TranslationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  locale: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default TranslationWhereInputSchema;
