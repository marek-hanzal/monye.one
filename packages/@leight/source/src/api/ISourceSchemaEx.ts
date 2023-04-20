import {z} from "@leight/zod";

export interface ISourceSchemaEx<
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
> {
    WhereSchema: TWhereSchema;
    WhereUniqueSchema: TWhereUniqueSchema;
    OrderBySchema: TOrderBySchema;
}

/**
 * Extended Source schemas; useful to specify close-to-db schemas (for example Prisma binding).
 */
export interface ISourceSchemaExType<
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
> extends ISourceSchemaEx<TWhereSchema, TWhereUniqueSchema, TOrderBySchema> {
    Where: z.infer<TWhereSchema>;
    WhereUnique: z.infer<TWhereUniqueSchema>;
    OrderBy: z.infer<TOrderBySchema>;
}

export namespace ISourceSchemaExType {
    export type of<TSourceSchemaEx extends ISourceSchemaEx<any, any, any>> = ISourceSchemaExType<
        TSourceSchemaEx["WhereSchema"],
        TSourceSchemaEx["WhereUniqueSchema"],
        TSourceSchemaEx["OrderBySchema"]
    >;
}
