import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereUniqueInputSchema } from './FileWhereUniqueInputSchema';
import { FileCreateWithoutUserInputSchema } from './FileCreateWithoutUserInputSchema';
import { FileUncheckedCreateWithoutUserInputSchema } from './FileUncheckedCreateWithoutUserInputSchema';

export const FileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default FileCreateOrConnectWithoutUserInputSchema;
