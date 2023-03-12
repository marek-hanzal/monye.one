import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumJobStatusFilterSchema } from './EnumJobStatusFilterSchema';
import { JobStatusSchema } from './JobStatusSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';
import { FloatNullableFilterSchema } from './FloatNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { JobLogListRelationFilterSchema } from './JobLogListRelationFilterSchema';

export const JobWhereInputSchema: z.ZodType<Prisma.JobWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobWhereInputSchema),z.lazy(() => JobWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobWhereInputSchema),z.lazy(() => JobWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumJobStatusFilterSchema),z.lazy(() => JobStatusSchema) ]).optional(),
  total: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  progress: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  success: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  successRatio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  failure: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  failureRatio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  skip: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  skipRatio: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  started: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  finished: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  params: z.lazy(() => JsonNullableFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  logs: z.lazy(() => JobLogListRelationFilterSchema).optional()
}).strict();

export default JobWhereInputSchema;
