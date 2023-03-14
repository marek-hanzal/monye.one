import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountFindManyArgsSchema } from "../outputTypeSchemas/AccountFindManyArgsSchema"
import { SessionFindManyArgsSchema } from "../outputTypeSchemas/SessionFindManyArgsSchema"
import { UserTokenFindManyArgsSchema } from "../outputTypeSchemas/UserTokenFindManyArgsSchema"
import { FileFindManyArgsSchema } from "../outputTypeSchemas/FileFindManyArgsSchema"
import { JobFindManyArgsSchema } from "../outputTypeSchemas/JobFindManyArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  UserToken: z.union([z.boolean(),z.lazy(() => UserTokenFindManyArgsSchema)]).optional(),
  File: z.union([z.boolean(),z.lazy(() => FileFindManyArgsSchema)]).optional(),
  Job: z.union([z.boolean(),z.lazy(() => JobFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default UserIncludeSchema;
