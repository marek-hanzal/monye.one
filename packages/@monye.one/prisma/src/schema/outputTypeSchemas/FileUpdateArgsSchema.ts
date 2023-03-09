import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileIncludeSchema } from '../inputTypeSchemas/FileIncludeSchema'
import { FileUpdateInputSchema } from '../inputTypeSchemas/FileUpdateInputSchema'
import { FileUncheckedUpdateInputSchema } from '../inputTypeSchemas/FileUncheckedUpdateInputSchema'
import { FileWhereUniqueInputSchema } from '../inputTypeSchemas/FileWhereUniqueInputSchema'
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

export const FileUpdateArgsSchema: z.ZodType<Prisma.FileUpdateArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  data: z.union([ FileUpdateInputSchema,FileUncheckedUpdateInputSchema ]),
  where: FileWhereUniqueInputSchema,
}).strict()

export default FileUpdateArgsSchema;
