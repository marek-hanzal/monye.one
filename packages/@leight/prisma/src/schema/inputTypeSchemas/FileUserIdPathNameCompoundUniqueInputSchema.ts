import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const FileUserIdPathNameCompoundUniqueInputSchema: z.ZodType<Prisma.FileUserIdPathNameCompoundUniqueInput> = z.object({
  userId: z.string(),
  path: z.string(),
  name: z.string()
}).strict();

export default FileUserIdPathNameCompoundUniqueInputSchema;
