import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const FileCreateManyInputSchema: z.ZodType<Prisma.FileCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string(),
  name: z.string(),
  mime: z.string(),
  size: z.number().int(),
  location: z.string(),
  ttl: z.number().int().optional().nullable(),
  created: z.coerce.date(),
  updated: z.coerce.date().optional().nullable(),
  userId: z.string().optional().nullable(),
}).strict();

export default FileCreateManyInputSchema;
