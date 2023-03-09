import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereUniqueInputSchema } from './FileWhereUniqueInputSchema';
import { FileUpdateWithoutUserInputSchema } from './FileUpdateWithoutUserInputSchema';
import { FileUncheckedUpdateWithoutUserInputSchema } from './FileUncheckedUpdateWithoutUserInputSchema';
import { FileCreateWithoutUserInputSchema } from './FileCreateWithoutUserInputSchema';
import { FileUncheckedCreateWithoutUserInputSchema } from './FileUncheckedCreateWithoutUserInputSchema';

export const FileUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FileUpdateWithoutUserInputSchema),z.lazy(() => FileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default FileUpsertWithWhereUniqueWithoutUserInputSchema;
