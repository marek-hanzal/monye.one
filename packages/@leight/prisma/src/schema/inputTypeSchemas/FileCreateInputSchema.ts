import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutFileInputSchema } from './UserCreateNestedOneWithoutFileInputSchema';

export const FileCreateInputSchema: z.ZodType<Prisma.FileCreateInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string(),
  name: z.string(),
  mime: z.string(),
  size: z.number().int(),
  location: z.string(),
  ttl: z.number().int().optional().nullable(),
  created: z.coerce.date(),
  updated: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutFileInputSchema).optional()
}).strict();

export default FileCreateInputSchema;
