import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogIncludeSchema } from '../inputTypeSchemas/JobLogIncludeSchema'
import { JobLogWhereInputSchema } from '../inputTypeSchemas/JobLogWhereInputSchema'
import { JobLogOrderByWithRelationInputSchema } from '../inputTypeSchemas/JobLogOrderByWithRelationInputSchema'
import { JobLogWhereUniqueInputSchema } from '../inputTypeSchemas/JobLogWhereUniqueInputSchema'
import { JobLogScalarFieldEnumSchema } from '../inputTypeSchemas/JobLogScalarFieldEnumSchema'
import { JobArgsSchema } from "../outputTypeSchemas/JobArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const JobLogSelectSchema: z.ZodType<Prisma.JobLogSelect> = z.object({
  id: z.boolean().optional(),
  jobId: z.boolean().optional(),
  message: z.boolean().optional(),
  job: z.union([z.boolean(),z.lazy(() => JobArgsSchema)]).optional(),
}).strict()

export const JobLogFindFirstArgsSchema: z.ZodType<Prisma.JobLogFindFirstArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  where: JobLogWhereInputSchema.optional(),
  orderBy: z.union([ JobLogOrderByWithRelationInputSchema.array(),JobLogOrderByWithRelationInputSchema ]).optional(),
  cursor: JobLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JobLogScalarFieldEnumSchema.array().optional(),
}).strict()

export default JobLogFindFirstArgsSchema;
