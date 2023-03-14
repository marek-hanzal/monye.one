import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileCreateManyUserInputSchema } from './FileCreateManyUserInputSchema';

export const FileCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FileCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FileCreateManyUserInputSchema),z.lazy(() => FileCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default FileCreateManyUserInputEnvelopeSchema;
