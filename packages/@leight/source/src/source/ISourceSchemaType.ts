import {z} from "@leight/zod";
import {
    type ICreateSchema,
    type ICursorSchema,
    type IDtoSchema,
    type IEntitySchema,
    type IFilterSchema,
    type IParamsSchema,
    type IPatchSchema,
    type IQuery,
    type IQuerySchema,
    type ISortSchema,
    type IToCreateSchema,
    type IToPatchSchema
}          from "../schema";

/**
 * This is required as a type, but also as a structure holding schemas for
 * a Source.
 */
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
    EntitySchema: TEntitySchema;
    DtoSchema: TDtoSchema;
    ToCreateSchema: TToCreateSchema;
    CreateSchema: TCreateSchema;
    ToPatchSchema: TToPatchSchema;
    PatchSchema: TPatchSchema;
    FilterSchema: TFilterSchema;
    SortSchema: TSortSchema;
    ParamsSchema: TParamsSchema;
    CursorSchema: ICursorSchema;
    QuerySchema: IQuerySchema<TFilterSchema, TSortSchema, TParamsSchema>;
    QueryOptionalSchema: z.ZodOptional<IQuerySchema<TFilterSchema, TSortSchema, TParamsSchema>>;
}

export namespace ISourceSchema {
    export type of<TSourceSchemaType extends ISourceSchemaType> = ISourceSchema<
        TSourceSchemaType["EntitySchema"],
        TSourceSchemaType["DtoSchema"],
        TSourceSchemaType["ToCreateSchema"],
        TSourceSchemaType["CreateSchema"],
        TSourceSchemaType["ToPatchSchema"],
        TSourceSchemaType["PatchSchema"],
        TSourceSchemaType["FilterSchema"],
        TSourceSchemaType["SortSchema"],
        TSourceSchemaType["ParamsSchema"]
    >;
}

/**
 * Source type schema is intended to be used only as a pure type as it does
 * not make sense to use otherwise.
 */
export interface ISourceSchemaType<
    TEntitySchema extends IEntitySchema = IEntitySchema,
    TDtoSchema extends IDtoSchema = IDtoSchema,
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TCreateSchema extends ICreateSchema = ICreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TPatchSchema extends IPatchSchema = IPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> extends ISourceSchema<
    TEntitySchema,
    TDtoSchema,
    TToCreateSchema,
    TCreateSchema,
    TToPatchSchema,
    TPatchSchema,
    TFilterSchema,
    TSortSchema,
    TParamsSchema
> {
    Entity: z.infer<TEntitySchema>;
    Dto: z.infer<TDtoSchema>;
    ToCreate: z.infer<TToCreateSchema>;
    Create: z.infer<TCreateSchema>;
    ToPatch: z.infer<TToPatchSchema>;
    Patch: z.infer<TPatchSchema>;
    Filter: z.infer<TFilterSchema>;
    Sort: z.infer<TSortSchema>;
    Params: z.infer<TParamsSchema>;
    Cursor: z.infer<ICursorSchema>;
    Query: IQuery<TFilterSchema, TSortSchema, TParamsSchema>;
    QueryOptional: IQuery<TFilterSchema, TSortSchema, TParamsSchema> | undefined;
}

export namespace ISourceSchemaType {
    export type of<TSourceSchema extends ISourceSchema> = ISourceSchemaType<
        TSourceSchema["EntitySchema"],
        TSourceSchema["DtoSchema"],
        TSourceSchema["ToCreateSchema"],
        TSourceSchema["CreateSchema"],
        TSourceSchema["ToPatchSchema"],
        TSourceSchema["PatchSchema"],
        TSourceSchema["FilterSchema"],
        TSourceSchema["SortSchema"],
        TSourceSchema["ParamsSchema"]
    >;
}
