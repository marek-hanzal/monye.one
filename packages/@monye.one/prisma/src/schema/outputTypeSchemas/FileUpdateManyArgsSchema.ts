import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileUpdateManyMutationInputSchema } from '../inputTypeSchemas/FileUpdateManyMutationInputSchema'
import { FileUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/FileUncheckedUpdateManyInputSchema'
import { FileWhereInputSchema } from '../inputTypeSchemas/FileWhereInputSchema'

export const FileUpdateManyArgsSchema: z.ZodType<Prisma.FileUpdateManyArgs> = z.object({
  data: z.union([ FileUpdateManyMutationInputSchema,FileUncheckedUpdateManyInputSchema ]),
  where: FileWhereInputSchema.optional(),
}).strict()

export default FileUpdateManyArgsSchema;
