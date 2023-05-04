import {
    type ICreateSchema,
    type IDtoSchema,
    type IEntitySchema,
    type IPatchSchema,
    type IToCreateSchema,
    type IToPatchSchema
} from "../schema";

export interface IRepositoryMapperSchema<
    TEntitySchema extends IEntitySchema = IEntitySchema,
    TDtoSchema extends IDtoSchema = IDtoSchema,
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TCreateSchema extends ICreateSchema = ICreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TPatchSchema extends IPatchSchema = IPatchSchema,
> {
    EntitySchema: TEntitySchema;
    DtoSchema: TDtoSchema;
    ToCreateSchema: TToCreateSchema;
    CreateSchema: TCreateSchema;
    ToPatchSchema: TToPatchSchema;
    PatchSchema: TPatchSchema;
}
