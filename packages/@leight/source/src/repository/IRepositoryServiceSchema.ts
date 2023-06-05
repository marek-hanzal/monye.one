import {type IFilterSchema}           from "../schema/FilterSchema";
import {type IParamsSchema}           from "../schema/ParamsSchema";
import {type ISortSchema}             from "../schema/SortSchema";
import {
    type ICreateSchema,
    type IDtoSchema,
    type IEntitySchema,
    type IPatchSchema,
    type IToCreateSchema,
    type IToPatchSchema
}                                     from "../schema/SourceSchema";
import {type IRepositoryMapperSchema} from "./IRepositoryMapperSchema";

export type IRepositoryServiceSchema<
    TEntitySchema extends IEntitySchema = IEntitySchema,
    TDtoSchema extends IDtoSchema = IDtoSchema,
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TCreateSchema extends ICreateSchema = ICreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TPatchSchema extends IPatchSchema = IPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> = IRepositoryMapperSchema<
    TEntitySchema,
    TDtoSchema,
    TToCreateSchema,
    TCreateSchema,
    TToPatchSchema,
    TPatchSchema,
    TFilterSchema,
    TSortSchema,
    TParamsSchema
>;
