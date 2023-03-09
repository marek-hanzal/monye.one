import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobWhereInputSchema } from '../inputTypeSchemas/JobWhereInputSchema'

export const JobDeleteManyArgsSchema: z.ZodType<Prisma.JobDeleteManyArgs> = z.object({
  where: JobWhereInputSchema.optional(),
}).strict()

export default JobDeleteManyArgsSchema;
