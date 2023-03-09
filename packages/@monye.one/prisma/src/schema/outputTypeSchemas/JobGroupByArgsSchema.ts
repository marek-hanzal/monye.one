import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobWhereInputSchema } from '../inputTypeSchemas/JobWhereInputSchema'
import { JobOrderByWithAggregationInputSchema } from '../inputTypeSchemas/JobOrderByWithAggregationInputSchema'
import { JobScalarFieldEnumSchema } from '../inputTypeSchemas/JobScalarFieldEnumSchema'
import { JobScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/JobScalarWhereWithAggregatesInputSchema'

export const JobGroupByArgsSchema: z.ZodType<Prisma.JobGroupByArgs> = z.object({
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithAggregationInputSchema.array(),JobOrderByWithAggregationInputSchema ]).optional(),
  by: JobScalarFieldEnumSchema.array(),
  having: JobScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default JobGroupByArgsSchema;
