import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileIncludeSchema } from '../inputTypeSchemas/FileIncludeSchema'
import { FileCreateInputSchema } from '../inputTypeSchemas/FileCreateInputSchema'
import { FileUncheckedCreateInputSchema } from '../inputTypeSchemas/FileUncheckedCreateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const FileSelectSchema: z.ZodType<Prisma.FileSelect> = z.object({
  id: z.boolean().optional(),
  path: z.boolean().optional(),
  name: z.boolean().optional(),
  mime: z.boolean().optional(),
  size: z.boolean().optional(),
  location: z.boolean().optional(),
  ttl: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const FileCreateArgsSchema: z.ZodType<Prisma.FileCreateArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  data: z.union([ FileCreateInputSchema,FileUncheckedCreateInputSchema ]),
}).strict()

export default FileCreateArgsSchema;
