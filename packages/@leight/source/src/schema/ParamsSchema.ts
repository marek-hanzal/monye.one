import {z} from "@leight/utils";

export const ParamsSchema = z.object({});
export type IParamsSchema = z.ZodObject<any, "strip">;
export type IParams = z.infer<IParamsSchema>;
