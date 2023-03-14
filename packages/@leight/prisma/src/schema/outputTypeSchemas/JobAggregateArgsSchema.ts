import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobWhereInputSchema } from '../inputTypeSchemas/JobWhereInputSchema'
import { JobOrderByWithRelationInputSchema } from '../inputTypeSchemas/JobOrderByWithRelationInputSchema'
import { JobWhereUniqueInputSchema } from '../inputTypeSchemas/JobWhereUniqueInputSchema'

export const JobAggregateArgsSchema: z.ZodType<Prisma.JobAggregateArgs> = z.object({
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithRelationInputSchema.array(),JobOrderByWithRelationInputSchema ]).optional(),
  cursor: JobWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default JobAggregateArgsSchema;
