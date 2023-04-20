import {type ICursorSchema} from "@leight/cursor";
import {type IFilterSchema} from "@leight/filter";
import {
    type IParamsSchema,
    type IQuery,
    type IQuerySchema
}                           from "@leight/query";
import {type ISortSchema}   from "@leight/sort";
import {z}                  from "@leight/zod";
import {
    type ICreateSchema,
    type IDtoSchema,
    type IEntitySchema,
    type IPatchSchema,
    type IToCreateSchema,
    type IToPatchSchema
}                           from "../schema";

/**
 * Source schema definition. Contains all the types used in the Source.
 */
export type ISourceSchema<
    TEntitySchema extends IEntitySchema = IEntitySchema,
    TDtoSchema extends IDtoSchema = IDtoSchema,
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TCreateSchema extends ICreateSchema = ICreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TPatchSchema extends IPatchSchema = IPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> = {
    EntitySchema: TEntitySchema;
    Entity: z.infer<TEntitySchema>;
    DtoSchema: TDtoSchema;
    Dto: z.infer<TDtoSchema>;
    ToCreateSchema: TToCreateSchema;
    ToCreate: z.infer<TToCreateSchema>;
    CreateSchema: TCreateSchema;
    Create: z.infer<TCreateSchema>;
    ToPatchSchema: TToPatchSchema;
    ToPatch: z.infer<TToPatchSchema>;
    PatchSchema: TPatchSchema;
    Patch: z.infer<TPatchSchema>;
    FilterSchema: TFilterSchema;
    Filter: z.infer<TFilterSchema>;
    SortSchema: TSortSchema;
    Sort: z.infer<TSortSchema>;
    ParamsSchema: TParamsSchema;
    Params: z.infer<TParamsSchema>;
    CursorSchema: ICursorSchema;
    Cursor: z.infer<ICursorSchema>;
    QuerySchema: IQuerySchema<TFilterSchema, TSortSchema, TParamsSchema>;
    Query: IQuery<TFilterSchema, TSortSchema, TParamsSchema>;
}
