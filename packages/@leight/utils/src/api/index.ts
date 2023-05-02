import {z} from "@leight/zod";

export type IHrefQuery = Record<string | number, unknown>;

export interface IHrefProps<TQuery extends IHrefQuery = IHrefQuery> {
    href: string;
    query?: TQuery;
}

export interface IToString {
    toString(): string;
}

export const LiteralSchema = z.union([
    z.string(),
    z.boolean(),
    z.number(),
    z.date(),
    z.null(),
    z.undefined(),
]);
export type ILiteral = z.infer<typeof LiteralSchema>;

export type IJson =
    ILiteral
    | { [key: string]: IJson }
    | IJson[];

export const JsonSchema: z.ZodType<IJson> = z.lazy(() =>
    z.union([
        LiteralSchema,
        z.array(LiteralSchema),
        z.record(LiteralSchema),
    ])
);
