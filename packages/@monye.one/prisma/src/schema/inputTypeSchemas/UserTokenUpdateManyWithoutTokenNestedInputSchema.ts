import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenCreateWithoutTokenInputSchema } from './UserTokenCreateWithoutTokenInputSchema';
import { UserTokenUncheckedCreateWithoutTokenInputSchema } from './UserTokenUncheckedCreateWithoutTokenInputSchema';
import { UserTokenCreateOrConnectWithoutTokenInputSchema } from './UserTokenCreateOrConnectWithoutTokenInputSchema';
import { UserTokenUpsertWithWhereUniqueWithoutTokenInputSchema } from './UserTokenUpsertWithWhereUniqueWithoutTokenInputSchema';
import { UserTokenCreateManyTokenInputEnvelopeSchema } from './UserTokenCreateManyTokenInputEnvelopeSchema';
import { UserTokenWhereUniqueInputSchema } from './UserTokenWhereUniqueInputSchema';
import { UserTokenUpdateWithWhereUniqueWithoutTokenInputSchema } from './UserTokenUpdateWithWhereUniqueWithoutTokenInputSchema';
import { UserTokenUpdateManyWithWhereWithoutTokenInputSchema } from './UserTokenUpdateManyWithWhereWithoutTokenInputSchema';
import { UserTokenScalarWhereInputSchema } from './UserTokenScalarWhereInputSchema';

export const UserTokenUpdateManyWithoutTokenNestedInputSchema: z.ZodType<Prisma.UserTokenUpdateManyWithoutTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTokenCreateWithoutTokenInputSchema),z.lazy(() => UserTokenCreateWithoutTokenInputSchema).array(),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema),z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTokenUpsertWithWhereUniqueWithoutTokenInputSchema),z.lazy(() => UserTokenUpsertWithWhereUniqueWithoutTokenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTokenCreateManyTokenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTokenUpdateWithWhereUniqueWithoutTokenInputSchema),z.lazy(() => UserTokenUpdateWithWhereUniqueWithoutTokenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTokenUpdateManyWithWhereWithoutTokenInputSchema),z.lazy(() => UserTokenUpdateManyWithWhereWithoutTokenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTokenScalarWhereInputSchema),z.lazy(() => UserTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default UserTokenUpdateManyWithoutTokenNestedInputSchema;
