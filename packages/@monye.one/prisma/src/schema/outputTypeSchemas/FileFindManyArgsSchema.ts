import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileIncludeSchema } from '../inputTypeSchemas/FileIncludeSchema'
import { FileWhereInputSchema } from '../inputTypeSchemas/FileWhereInputSchema'
import { FileOrderByWithRelationInputSchema } from '../inputTypeSchemas/FileOrderByWithRelationInputSchema'
import { FileWhereUniqueInputSchema } from '../inputTypeSchemas/FileWhereUniqueInputSchema'
import { FileScalarFieldEnumSchema } from '../inputTypeSchemas/FileScalarFieldEnumSchema'
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

export const FileFindManyArgsSchema: z.ZodType<Prisma.FileFindManyArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FileScalarFieldEnumSchema.array().optional(),
}).strict()

export default FileFindManyArgsSchema;
