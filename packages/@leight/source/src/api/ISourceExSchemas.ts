import {z} from "@leight/zod";

/**
 * Extended Source schemas; useful to specify close-to-db schemas (for example Prisma binding).
 */
export type ISourceExSchema<
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
> = {
    WhereSchema: TWhereSchema;
    Where: z.infer<TWhereSchema>;
    WhereUniqueSchema: TWhereUniqueSchema;
    WhereUnique: z.infer<TWhereUniqueSchema>;
    OrderBySchema: TOrderBySchema;
    OrderBy: z.infer<TOrderBySchema>;
}

export type ISourceExSchemas<
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
> = {
    WhereSchema: TWhereSchema;
    WhereUniqueSchema: TWhereUniqueSchema;
    OrderBySchema: TOrderBySchema;
}
