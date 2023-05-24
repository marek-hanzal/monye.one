import {z} from "zod";

export const LiteralSchema = z.union([
    z.string(),
    z.boolean(),
    z.number(),
    z.date(),
    z.null(),
    z.undefined(),
]);
export type ILiteralSchema = typeof LiteralSchema;
export type ILiteral = z.infer<ILiteralSchema>;
