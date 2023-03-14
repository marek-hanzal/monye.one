import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileScalarWhereInputSchema } from './FileScalarWhereInputSchema';
import { FileUpdateManyMutationInputSchema } from './FileUpdateManyMutationInputSchema';
import { FileUncheckedUpdateManyWithoutFileInputSchema } from './FileUncheckedUpdateManyWithoutFileInputSchema';

export const FileUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FileUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FileScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FileUpdateManyMutationInputSchema),z.lazy(() => FileUncheckedUpdateManyWithoutFileInputSchema) ]),
}).strict();

export default FileUpdateManyWithWhereWithoutUserInputSchema;
