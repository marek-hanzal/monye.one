import { z } from 'zod';

export const DecimalJSLikeListSchema = z.object({ d: z.array(z.number()), e: z.number(), s: z.number() }).array();

export default DecimalJSLikeListSchema;
