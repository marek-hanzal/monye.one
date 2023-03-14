import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenCreateWithoutTokenInputSchema } from './UserTokenCreateWithoutTokenInputSchema';
import { UserTokenUncheckedCreateWithoutTokenInputSchema } from './UserTokenUncheckedCreateWithoutTokenInputSchema';
import { UserTokenCreateOrConnectWithoutTokenInputSchema } from './UserTokenCreateOrConnectWithoutTokenInputSchema';
import { UserTokenCreateManyTokenInputEnvelopeSchema } from './UserTokenCreateManyTokenInputEnvelopeSchema';
import { UserTokenWhereUniqueInputSchema } from './UserTokenWhereUniqueInputSchema';

export const UserTokenCreateNestedManyWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenCreateNestedManyWithoutTokenInput> = z.object({
  create: z.union([ z.lazy(() => UserTokenCreateWithoutTokenInputSchema),z.lazy(() => UserTokenCreateWithoutTokenInputSchema).array(),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema),z.lazy(() => UserTokenUncheckedCreateWithoutTokenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema),z.lazy(() => UserTokenCreateOrConnectWithoutTokenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTokenCreateManyTokenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTokenWhereUniqueInputSchema),z.lazy(() => UserTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default UserTokenCreateNestedManyWithoutTokenInputSchema;
