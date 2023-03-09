import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { JobUpdateOneRequiredWithoutLogsNestedInputSchema } from './JobUpdateOneRequiredWithoutLogsNestedInputSchema';

export const JobLogUpdateInputSchema: z.ZodType<Prisma.JobLogUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job: z.lazy(() => JobUpdateOneRequiredWithoutLogsNestedInputSchema).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default JobLogUpdateInputSchema;
