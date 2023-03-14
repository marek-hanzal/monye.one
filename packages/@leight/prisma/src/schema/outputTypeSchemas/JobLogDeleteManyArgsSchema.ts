import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogWhereInputSchema } from '../inputTypeSchemas/JobLogWhereInputSchema'

export const JobLogDeleteManyArgsSchema: z.ZodType<Prisma.JobLogDeleteManyArgs> = z.object({
  where: JobLogWhereInputSchema.optional(),
}).strict()

export default JobLogDeleteManyArgsSchema;
