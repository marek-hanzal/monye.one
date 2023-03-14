import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobStatusSchema } from './JobStatusSchema';

export const EnumJobStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumJobStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => JobStatusSchema).optional()
}).strict();

export default EnumJobStatusFieldUpdateOperationsInputSchema;
