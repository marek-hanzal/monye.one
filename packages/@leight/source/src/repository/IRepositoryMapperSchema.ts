import {z}                      from "@leight/utils";
import {type IFilterSchema}     from "../schema/FilterSchema";
import {type IParamsSchema}     from "../schema/ParamsSchema";
import {type ISortSchema}       from "../schema/SortSchema";
import {
    type ICreateSchema,
    type IDtoSchema,
    type IEntitySchema,
    type IPatchSchema,
    type IToCreateSchema,
    type IToPatchSchema
}                               from "../schema/SourceSchema";
import {type IRepositorySchema} from "./IRepositorySchema";

export interface IRepositoryMapperSchema<
    TEntitySchema extends IEntitySchema = IEntitySchema,
    TDtoSchema extends IDtoSchema = IDtoSchema,
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TCreateSchema extends ICreateSchema = ICreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TPatchSchema extends IPatchSchema = IPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> extends IRepositorySchema<
    TEntitySchema,
    TCreateSchema,
    TPatchSchema,
    TFilterSchema,
    TSortSchema,
    TParamsSchema
> {
    DtoSchema: TDtoSchema;
    ToCreateSchema: TToCreateSchema;
    ToPatchSchema: TToPatchSchema;
    ToPatchSchemaProps: z.ZodObject<{
        patch: TToPatchSchema;
        filter: TFilterSchema;
    }, "strip">;
    ToPatchBySchemaProps: z.ZodObject<{
        patch: TToPatchSchema;
        filter: TFilterSchema;
    }, "strip">;
    ToUpsertSchemaProps: z.ZodObject<{
        create: TToCreateSchema;
        patch: TToPatchSchema;
        filter: TFilterSchema;
    }, "strip">;
}
