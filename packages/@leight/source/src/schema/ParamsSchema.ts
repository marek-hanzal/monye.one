import {z} from "@leight/zod";

export const ParamsSchema = z.object({});
export type IParamsSchema = z.ZodObject<any>;
export type IParams = z.infer<IParamsSchema>;
