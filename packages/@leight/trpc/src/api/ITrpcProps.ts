import { z, type ZodType } from "zod";

export interface ITrpcProps<TZodType extends ZodType> {
    input: z.infer<TZodType>;
}
