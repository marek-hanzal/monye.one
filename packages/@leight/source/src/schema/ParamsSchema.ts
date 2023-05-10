import {z} from "@leight/zod";

export const ParamsSchema = z.object({});
export type IParamsSchema = z.ZodObject<any, "strip">;
export type IParams = z.infer<IParamsSchema>;
