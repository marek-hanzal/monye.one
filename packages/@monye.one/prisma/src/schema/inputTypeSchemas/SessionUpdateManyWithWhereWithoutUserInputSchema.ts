import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionScalarWhereInputSchema } from './SessionScalarWhereInputSchema';
import { SessionUpdateManyMutationInputSchema } from './SessionUpdateManyMutationInputSchema';
import { SessionUncheckedUpdateManyWithoutSessionsInputSchema } from './SessionUncheckedUpdateManyWithoutSessionsInputSchema';

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema) ]),
}).strict();

export default SessionUpdateManyWithWhereWithoutUserInputSchema;
