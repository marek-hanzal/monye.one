import {
    type ICreateSchema,
    type IDtoSchema,
    type IEntitySchema,
    type IPatchSchema,
    type IToCreateSchema,
    type IToPatchSchema
}                                     from "../schema";
import {type IRepositoryMapperSchema} from "./IRepositoryMapperSchema";

export type IRepositoryServiceSchema<
    TEntitySchema extends IEntitySchema = IEntitySchema,
    TDtoSchema extends IDtoSchema = IDtoSchema,
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TCreateSchema extends ICreateSchema = ICreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TPatchSchema extends IPatchSchema = IPatchSchema,
> = IRepositoryMapperSchema<
    TEntitySchema,
    TDtoSchema,
    TToCreateSchema,
    TCreateSchema,
    TToPatchSchema,
    TPatchSchema
>;
