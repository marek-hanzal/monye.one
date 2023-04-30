import {z}    from "@leight/zod";
import {Pack} from "../utils";

export const JsonUnpackSchema = z.string().transform(Pack.unpack);
export type IJsonUnpackSchema = typeof JsonUnpackSchema;
export type IJsonUnpack = z.infer<IJsonUnpackSchema>;
