import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileCreateWithoutUserInputSchema } from './FileCreateWithoutUserInputSchema';
import { FileUncheckedCreateWithoutUserInputSchema } from './FileUncheckedCreateWithoutUserInputSchema';
import { FileCreateOrConnectWithoutUserInputSchema } from './FileCreateOrConnectWithoutUserInputSchema';
import { FileCreateManyUserInputEnvelopeSchema } from './FileCreateManyUserInputEnvelopeSchema';
import { FileWhereUniqueInputSchema } from './FileWhereUniqueInputSchema';

export const FileCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FileCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileCreateWithoutUserInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutUserInputSchema),z.lazy(() => FileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default FileCreateNestedManyWithoutUserInputSchema;
