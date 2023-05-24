import {z} from "@leight/utils";

export interface IRepositorySchemaEx<
    TWhereSchema extends z.ZodType = z.ZodType,
    TWhereUniqueSchema extends z.ZodType = z.ZodType,
    TOrderBySchema extends z.ZodType = z.ZodType,
> {
    Schema: IRepositorySchemaEx.Schema<
        TWhereSchema,
        TWhereUniqueSchema,
        TOrderBySchema
    >;
    Type: IRepositorySchemaEx.Type<
        IRepositorySchemaEx.Schema<
            TWhereSchema,
            TWhereUniqueSchema,
            TOrderBySchema
        >
    >;
}

export namespace IRepositorySchemaEx {
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
        TSchema extends Schema
    > {
        Where: z.infer<TSchema["WhereSchema"]>;
        WhereUnique: z.infer<TSchema["WhereUniqueSchema"]>;
        OrderBy: z.infer<TSchema["OrderBySchema"]>;
    }
}
