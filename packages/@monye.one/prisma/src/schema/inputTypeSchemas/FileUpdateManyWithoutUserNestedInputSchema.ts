import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileCreateWithoutUserInputSchema } from './FileCreateWithoutUserInputSchema';
import { FileUncheckedCreateWithoutUserInputSchema } from './FileUncheckedCreateWithoutUserInputSchema';
import { FileCreateOrConnectWithoutUserInputSchema } from './FileCreateOrConnectWithoutUserInputSchema';
import { FileUpsertWithWhereUniqueWithoutUserInputSchema } from './FileUpsertWithWhereUniqueWithoutUserInputSchema';
import { FileCreateManyUserInputEnvelopeSchema } from './FileCreateManyUserInputEnvelopeSchema';
import { FileWhereUniqueInputSchema } from './FileWhereUniqueInputSchema';
import { FileUpdateWithWhereUniqueWithoutUserInputSchema } from './FileUpdateWithWhereUniqueWithoutUserInputSchema';
import { FileUpdateManyWithWhereWithoutUserInputSchema } from './FileUpdateManyWithWhereWithoutUserInputSchema';
import { FileScalarWhereInputSchema } from './FileScalarWhereInputSchema';

export const FileUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FileUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutUserInputSchema),z.lazy(() => FileCreateWithoutUserInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema),z.lazy(() => FileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutUserInputSchema),z.lazy(() => FileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FileUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FileUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FileUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FileUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FileUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FileUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default FileUpdateManyWithoutUserNestedInputSchema;
