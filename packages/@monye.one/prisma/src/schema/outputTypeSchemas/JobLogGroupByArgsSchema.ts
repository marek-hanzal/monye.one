import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogWhereInputSchema } from '../inputTypeSchemas/JobLogWhereInputSchema'
import { JobLogOrderByWithAggregationInputSchema } from '../inputTypeSchemas/JobLogOrderByWithAggregationInputSchema'
import { JobLogScalarFieldEnumSchema } from '../inputTypeSchemas/JobLogScalarFieldEnumSchema'
import { JobLogScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/JobLogScalarWhereWithAggregatesInputSchema'

export const JobLogGroupByArgsSchema: z.ZodType<Prisma.JobLogGroupByArgs> = z.object({
  where: JobLogWhereInputSchema.optional(),
  orderBy: z.union([ JobLogOrderByWithAggregationInputSchema.array(),JobLogOrderByWithAggregationInputSchema ]).optional(),
  by: JobLogScalarFieldEnumSchema.array(),
  having: JobLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default JobLogGroupByArgsSchema;
