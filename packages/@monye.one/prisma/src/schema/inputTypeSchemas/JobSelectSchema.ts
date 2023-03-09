import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { JobLogFindManyArgsSchema } from "../outputTypeSchemas/JobLogFindManyArgsSchema"
import { JobCountOutputTypeArgsSchema } from "../outputTypeSchemas/JobCountOutputTypeArgsSchema"

export const JobSelectSchema: z.ZodType<Prisma.JobSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  status: z.boolean().optional(),
  total: z.boolean().optional(),
  progress: z.boolean().optional(),
  success: z.boolean().optional(),
  successRatio: z.boolean().optional(),
  failure: z.boolean().optional(),
  failureRatio: z.boolean().optional(),
  skip: z.boolean().optional(),
  skipRatio: z.boolean().optional(),
  created: z.boolean().optional(),
  started: z.boolean().optional(),
  finished: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  params: z.boolean().optional(),
  logs: z.union([z.boolean(),z.lazy(() => JobLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JobCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default JobSelectSchema;
