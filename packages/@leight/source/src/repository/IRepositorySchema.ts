import {z} from "@leight/zod";
import {
    type ICreateSchema,
    type ICursorSchema,
    type IEntitySchema,
    type IFilterSchema,
    type IParamsSchema,
    type IPatchSchema,
    type ISortSchema,
    type IWithIdentitySchema
}          from "../schema";

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
    UpsertSchema: z.ZodObject<{
        create: TCreateSchema;
        patch: TPatchSchema;
        filter: TFilterSchema;
    }>;
    PatchSchema: z.ZodObject<{
        patch: TPatchSchema;
        filter: TFilterSchema;
    }>;
    PatchBySchema: z.ZodObject<{
        patch: TPatchSchema;
        filter: TFilterSchema;
    }>;
    DeleteSchema: IWithIdentitySchema;
    DeleteBySchema: TFilterSchema;
    CountSchema: TFilterSchema;
    QuerySchema: z.ZodObject<{
        filter: z.ZodOptional<TFilterSchema>;
        sort: z.ZodOptional<TSortSchema>;
        cursor: z.ZodOptional<ICursorSchema>;
        params: z.ZodOptional<TParamsSchema>;
    }>;
    FetchSchema: TFilterSchema;
    Fetch$Schema: TFilterSchema;
}
