import {z} from "@leight/zod";

export interface ISourceSchemaEx<
    TWhereSchema extends z.ZodType = z.ZodType,
    TWhereUniqueSchema extends z.ZodType = z.ZodType,
    TOrderBySchema extends z.ZodType = z.ZodType,
> {
    Schema: ISourceSchemaEx.Schema<
        TWhereSchema,
        TWhereUniqueSchema,
        TOrderBySchema
    >;
    Type: ISourceSchemaEx.Type<
        TWhereSchema,
        TWhereUniqueSchema,
        TOrderBySchema
    >;
}

export namespace ISourceSchemaEx {
    export interface Schema<
        TWhereSchema extends z.ZodType = z.ZodType,
        TWhereUniqueSchema extends z.ZodType = z.ZodType,
        TOrderBySchema extends z.ZodType = z.ZodType,
    > {
        WhereSchema: TWhereSchema;
        WhereUniqueSchema: TWhereUniqueSchema;
        OrderBySchema: TOrderBySchema;
    }

    export interface Type<
        TWhereSchema extends z.ZodType = z.ZodType,
        TWhereUniqueSchema extends z.ZodType = z.ZodType,
        TOrderBySchema extends z.ZodType = z.ZodType,
    > {
        Where: z.infer<TWhereSchema>;
        WhereUnique: z.infer<TWhereUniqueSchema>;
        OrderBy: z.infer<TOrderBySchema>;
    }
}
