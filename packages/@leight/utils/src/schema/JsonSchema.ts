import {z} from "zod";
import {
    type ILiteral,
    LiteralSchema
}          from "./LiteralSchema";

export type IJson =
    ILiteral
    | {
        [key: string]: IJson
    }
    | IJson[];

export type IJsonSchema = z.ZodType<IJson>;

export const JsonSchema: IJsonSchema = z.lazy(() =>
    z.union([
        LiteralSchema,
        z.array(LiteralSchema),
        z.record(LiteralSchema),
    ])
);
