import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const FileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FileUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  path: z.string(),
  name: z.string(),
  mime: z.string(),
  size: z.number(),
  location: z.string(),
  ttl: z.number().optional().nullable(),
  created: z.coerce.date(),
  updated: z.coerce.date().optional().nullable(),
}).strict();

export default FileUncheckedCreateWithoutUserInputSchema;
