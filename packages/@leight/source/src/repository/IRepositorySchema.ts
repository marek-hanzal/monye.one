import {z}                  from "@leight/utils";
import {type ICursorSchema} from "../schema/CursorSchema";
import {type IFilterSchema} from "../schema/FilterSchema";
import {type IParamsSchema} from "../schema/ParamsSchema";
import {type ISortSchema}   from "../schema/SortSchema";
import {
    type ICreateSchema,
    type IEntitySchema,
    type IPatchSchema,
    type IWithIdentitySchema
}                           from "../schema/SourceSchema";

export interface IRepositorySchema<
    TEntitySchema extends IEntitySchema = IEntitySchema,
    TCreateSchema extends ICreateSchema = ICreateSchema,
    TPatchSchema extends IPatchSchema = IPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> {
    EntitySchema: TEntitySchema;
    CreateSchema: TCreateSchema;
    PatchSchema: TPatchSchema;
    UpsertSchemaProps: z.ZodObject<{
        create: TCreateSchema;
        patch: TPatchSchema;
        filter: TFilterSchema;
    }, "strip">;
    PatchSchemaProps: z.ZodObject<{
        patch: TPatchSchema;
        filter: TFilterSchema;
    }, "strip">;
    PatchBySchemaProps: z.ZodObject<{
        patch: TPatchSchema;
        filter: TFilterSchema;
    }, "strip">;
    DeleteSchema: IWithIdentitySchema;
    DeleteBySchema: TFilterSchema;
    CountSchema: TFilterSchema;
    QuerySchema: z.ZodObject<{
        filter: z.ZodOptional<TFilterSchema>;
        sort: z.ZodOptional<TSortSchema>;
        cursor: z.ZodOptional<ICursorSchema>;
        params: z.ZodOptional<TParamsSchema>;
    }, "strip">;
    FetchSchema: TFilterSchema;
    Fetch$Schema: TFilterSchema;
    FilterSchema: TFilterSchema;
    SortSchema: TSortSchema;
    ParamsSchema: TParamsSchema;
    CursorSchema: ICursorSchema;
}
