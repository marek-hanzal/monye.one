import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional(),
}).strict();

export default DateTimeFieldUpdateOperationsInputSchema;
