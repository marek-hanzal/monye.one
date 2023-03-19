import {type IUseState}     from "@leight/context";
import {type ICursorSchema} from "@leight/cursor";
import {type IFilterSchema} from "@leight/filter";
import {
    type IParamsSchema,
    type IQuery,
    type IQuerySchema
}                           from "@leight/query";
import {type IUseQuery}     from "@leight/react-query";
import {type ISortSchema}   from "@leight/sort";
import {type IToString}     from "@leight/utils";
import {z}                  from "zod";

export type ISourceName =
    string
    | IToString;

export const WithIdentitySchema = z.object({
    id: z.string().cuid(),
});
export type IWithIdentitySchema = typeof WithIdentitySchema;
export type IWithIdentity = z.infer<IWithIdentitySchema>;

export const EntitySchema = z.object({}).merge(WithIdentitySchema);
export type IEntitySchema = typeof EntitySchema;
export type IEntity = z.infer<IEntitySchema>;

export const CreateSchema = z.object({});
export type ICreateSchema = z.ZodObject<any>;
export type ICreate = z.infer<ICreateSchema>;

export const PatchSchema = z.object({
    id: z.string(),
});
export type IPatchSchema = typeof PatchSchema;
export type IPatch = z.infer<IPatchSchema>;

/**
 * Source schema definition. Contains all the types used in the Source.
 */
export interface ISourceSchema<
    TEntitySchema extends IEntitySchema = IEntitySchema,
    TCreateSchema extends ICreateSchema = ICreateSchema,
    TPatchSchema extends IPatchSchema = IPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> {
    EntitySchema: TEntitySchema;
    Entity: z.infer<TEntitySchema>;
    CreateSchema: TCreateSchema;
    Create: z.infer<TCreateSchema>;
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

/**
 * Implementation of data source (general, not just a database one).
 */
export interface ISource<TSourceSchema extends ISourceSchema> {
    create(entity: TSourceSchema["Create"]): Promise<TSourceSchema["Entity"]>;

    upsert(props: ISource.IUpsert<TSourceSchema>): Promise<TSourceSchema["Entity"]>;

    patch(patch: TSourceSchema["Patch"]): Promise<TSourceSchema["Entity"]>;

    /**
     * Count items based on an optional query.
     */
    count(query?: TSourceSchema["Query"]): Promise<number>;

    /**
     * Query items.
     */
    query(query?: TSourceSchema["Query"]): Promise<TSourceSchema["Entity"][]>;

    find(id: string): Promise<TSourceSchema["Entity"]>;
}

export namespace ISource {
    export interface IUpsert<TSourceSchema extends ISourceSchema> {
        create: TSourceSchema["Create"];
        patch: Omit<TSourceSchema["Patch"], "id">;
        filter: TSourceSchema["Filter"];
    }
}

export interface ISourceStoreProps<TSourceSchema extends ISourceSchema> {
    readonly schema: TSourceSchema["EntitySchema"];
    readonly entities: TSourceSchema["Entity"][];
    readonly isLoading: boolean;
    readonly isFetching: boolean;

    setEntities(entities?: TSourceSchema["Entity"][]): void;

    setIsLoading(isLoading: boolean): void;

    setIsFetching(isFetching: boolean): void;
}

export type IUseSourceState<TSourceSchema extends ISourceSchema> = IUseState<ISourceStoreProps<TSourceSchema>>;

export type IUseSourceQuery<TSourceSchema extends ISourceSchema> = IUseQuery<TSourceSchema["Query"] | undefined, TSourceSchema["Entity"][]>;
