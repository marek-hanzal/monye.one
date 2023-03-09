import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { JobLogFindManyArgsSchema } from "../outputTypeSchemas/JobLogFindManyArgsSchema"
import { JobCountOutputTypeArgsSchema } from "../outputTypeSchemas/JobCountOutputTypeArgsSchema"

export const JobIncludeSchema: z.ZodType<Prisma.JobInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  logs: z.union([z.boolean(),z.lazy(() => JobLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JobCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default JobIncludeSchema;
