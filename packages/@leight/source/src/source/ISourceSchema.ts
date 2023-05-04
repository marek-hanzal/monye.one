import {
    type IRepositoryMapperSchema,
    type IRepositorySchema
} from "../repository";
import {
    type ICreateSchema,
    type IDtoSchema,
    type IEntitySchema,
    type IFilterSchema,
    type IParamsSchema,
    type IPatchSchema,
    type ISortSchema,
    type IToCreateSchema,
    type IToPatchSchema
} from "../schema";

export interface ISourceSchema<
    TEntitySchema extends IEntitySchema = IEntitySchema,
    TDtoSchema extends IDtoSchema = IDtoSchema,
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TCreateSchema extends ICreateSchema = ICreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TPatchSchema extends IPatchSchema = IPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> {
    Repository: IRepositorySchema<
        TEntitySchema,
        TCreateSchema,
        TPatchSchema,
        TFilterSchema,
        TSortSchema,
        TParamsSchema
    >;
    Mapper: IRepositoryMapperSchema<
        TEntitySchema,
        TDtoSchema,
        TToCreateSchema,
        TCreateSchema,
        TToPatchSchema,
        TPatchSchema
    >;
}
