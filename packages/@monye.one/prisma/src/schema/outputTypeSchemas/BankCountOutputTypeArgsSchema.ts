import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { BankCountOutputTypeSelectSchema } from './BankCountOutputTypeSelectSchema';

export const BankCountOutputTypeArgsSchema: z.ZodType<Prisma.BankCountOutputTypeArgs> = z.object({
  select: z.lazy(() => BankCountOutputTypeSelectSchema).nullish(),
}).strict();

export default BankCountOutputTypeSelectSchema;
