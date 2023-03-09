import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';

export const JobLogUncheckedUpdateManyWithoutLogsInputSchema: z.ZodType<Prisma.JobLogUncheckedUpdateManyWithoutLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default JobLogUncheckedUpdateManyWithoutLogsInputSchema;
