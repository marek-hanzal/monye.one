import {z}                 from "@leight/zod";
import {ISource}           from "./ISource";
import {ISourceSchemaType} from "./ISourceSchemaType";

export interface ISourceSchemaEx<
    TWhereSchema extends z.ZodType = z.ZodType,
    TWhereUniqueSchema extends z.ZodType = z.ZodType,
    TOrderBySchema extends z.ZodType = z.ZodType,
> {
    WhereSchema: TWhereSchema;
    WhereUniqueSchema: TWhereUniqueSchema;
    OrderBySchema: TOrderBySchema;
}

/**
 * Extended Source schemas; useful to specify close-to-db schemas (for example Prisma binding).
 */
export interface ISourceSchemaExType<
    TWhereSchema extends z.ZodType = z.ZodType,
    TWhereUniqueSchema extends z.ZodType = z.ZodType,
    TOrderBySchema extends z.ZodType = z.ZodType,
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

export interface ISourceEx<TSourceSchemaExType extends ISourceSchemaExType, TSourceSchemaType extends ISourceSchemaType> extends ISource<TSourceSchemaType> {
    toWhere(filter?: TSourceSchemaType["Filter"]): TSourceSchemaExType["Where"] | undefined;

    toWhereUnique(filter: TSourceSchemaType["Filter"]): TSourceSchemaExType["WhereUnique"];

    toOrderBy(sort?: TSourceSchemaType["Sort"]): TSourceSchemaExType["OrderBy"] | undefined;
}
