import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereUniqueInputSchema } from './FileWhereUniqueInputSchema';
import { FileUpdateWithoutUserInputSchema } from './FileUpdateWithoutUserInputSchema';
import { FileUncheckedUpdateWithoutUserInputSchema } from './FileUncheckedUpdateWithoutUserInputSchema';

export const FileUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FileUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FileUpdateWithoutUserInputSchema),z.lazy(() => FileUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default FileUpdateWithWhereUniqueWithoutUserInputSchema;
