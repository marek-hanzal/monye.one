import {z}    from "@leight/zod";
import {
    type IJson,
    LiteralSchema
}             from "../api";
import {Pack} from "../utils";

export const JsonPackSchema: z.ZodType<string, z.ZodTypeDef, IJson> = z.lazy(() => z.union([
    LiteralSchema,
    z.array(JsonPackSchema),
    z.record(JsonPackSchema)
])).transform(Pack.pack);

export type IJsonPackSchema = typeof JsonPackSchema;
export type IJsonPack = z.infer<IJsonPackSchema>;
