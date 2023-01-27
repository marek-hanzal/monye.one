import { z, type ZodType } from "zod";
import { type IContext } from "./IContext";

export interface ITrpcProps<TRequest extends ZodType> extends IContext {
    request: z.infer<TRequest>;
}
