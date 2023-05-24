import {z}             from "zod";
import {Pack}          from "../utils";
import {type IJson}    from "./JsonSchema";
import {LiteralSchema} from "./LiteralSchema";

export const JsonPackSchema: z.ZodType<string, z.ZodTypeDef, IJson> = z.lazy(() => z.union([
    LiteralSchema,
    z.array(JsonPackSchema),
    z.record(JsonPackSchema)
])).transform(Pack.pack);

export type IJsonPackSchema = typeof JsonPackSchema;
export type IJsonPack = z.infer<IJsonPackSchema>;
