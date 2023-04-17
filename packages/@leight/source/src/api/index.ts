import {
    type IStoreContext,
    type IUseState
}                         from "@leight/context";
import {
    CursorSchema,
    type ICursorSchema
}                         from "@leight/cursor";
import {
    FilterSchema,
    type IFilterSchema
}                         from "@leight/filter";
import {
    type IParamsSchema,
    type IQuery,
    type IQuerySchema,
    ParamsSchema,
    QuerySchema
}                         from "@leight/query";
import {type IUseQuery}   from "@leight/react-query";
import {
    type ISortSchema,
    SortSchema
}                         from "@leight/sort";
import {type IToString}   from "@leight/utils";
import {z}                from "@leight/zod";
import {type IStoreProps} from "@leight/zustand";

export type ISourceName =
    string
    | IToString;

export const WithIdentitySchema = z.object({
    id: z.string(),
});
export type IWithIdentitySchema = typeof WithIdentitySchema;
export type IWithIdentity = z.infer<IWithIdentitySchema>;

export const EntitySchema = z.object({}).merge(WithIdentitySchema);
export type IEntitySchema = typeof EntitySchema;
export type IEntity = z.infer<IEntitySchema>;

export const CreateSchema = z.object({});
export type ICreateSchema = z.ZodObject<any>;
export type ICreate = z.infer<ICreateSchema>;

export const ToCreateSchema = z.object({});
export type IToCreateSchema = z.ZodObject<any>;
export type IToCreate = z.infer<IToCreateSchema>;

export const PatchSchema = z.object({
    id: z.string(),
});
export type IPatchSchema = typeof PatchSchema;
export type IPatch = z.infer<IPatchSchema>;

/**
 * Source schema definition. Contains all the types used in the Source.
 */
export type ISourceSchema<
    TEntitySchema extends IEntitySchema = IEntitySchema,
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TCreateSchema extends ICreateSchema = ICreateSchema,
    TPatchSchema extends IPatchSchema = IPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> = {
    EntitySchema: TEntitySchema;
    Entity: z.infer<TEntitySchema>;
    ToCreateSchema: TToCreateSchema;
    ToCreate: z.infer<TToCreateSchema>;
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

export type ISourceSchemas<TSourceSchema extends ISourceSchema> = {
    EntitySchema: TSourceSchema["EntitySchema"];
    ToCreateSchema: TSourceSchema["ToCreateSchema"];
    CreateSchema: TSourceSchema["CreateSchema"];
    PatchSchema: TSourceSchema["PatchSchema"];
    FilterSchema: TSourceSchema["FilterSchema"];
    SortSchema: TSourceSchema["SortSchema"];
    ParamsSchema: TSourceSchema["ParamsSchema"];
    CursorSchema: TSourceSchema["CursorSchema"];
    QuerySchema: TSourceSchema["QuerySchema"];
}

export type IWithSourceSchemaProps<
    TEntitySchema extends IEntitySchema,
    TToCreateSchema extends IToCreateSchema,
    TCreateSchema extends ICreateSchema,
    TPatchSchema extends IPatchSchema,
    TFilterSchema extends IFilterSchema,
    TSortSchema extends ISortSchema,
    TParamsSchema extends IParamsSchema,
> = Partial<ISourceSchemas<ISourceSchema<TEntitySchema, TToCreateSchema, TCreateSchema, TPatchSchema, TFilterSchema, TSortSchema, TParamsSchema>>>;

export const withSourceSchema = <
    TEntitySchema extends IEntitySchema,
    TToCreateSchema extends IToCreateSchema,
    TCreateSchema extends ICreateSchema,
    TPatchSchema extends IPatchSchema,
    TFilterSchema extends IFilterSchema,
    TSortSchema extends ISortSchema,
    TParamsSchema extends IParamsSchema,
>(
    {
        EntitySchema:   $EntitySchema = EntitySchema as TEntitySchema,
        ToCreateSchema: $ToCreateSchema = ToCreateSchema as TToCreateSchema,
        CreateSchema:   $CreateSchema = CreateSchema as TCreateSchema,
        PatchSchema:    $PatchSchema = PatchSchema as TPatchSchema,
        FilterSchema:   $FilterSchema = FilterSchema as TFilterSchema,
        SortSchema:     $SortSchema = SortSchema as TSortSchema,
        ParamsSchema:   $ParamsSchema = ParamsSchema as TParamsSchema,
    }: IWithSourceSchemaProps<TEntitySchema, TToCreateSchema, TCreateSchema, TPatchSchema, TFilterSchema, TSortSchema, TParamsSchema>): ISourceSchemas<ISourceSchema<TEntitySchema, TToCreateSchema, TCreateSchema, TPatchSchema, TFilterSchema, TSortSchema, TParamsSchema>> => {
    return {
        EntitySchema:   $EntitySchema,
        ToCreateSchema: $ToCreateSchema,
        CreateSchema:   $CreateSchema,
        PatchSchema:    $PatchSchema,
        FilterSchema:   $FilterSchema,
        SortSchema:     $SortSchema,
        ParamsSchema:   $ParamsSchema,
        CursorSchema:   CursorSchema,
        QuerySchema:    QuerySchema({
            filterSchema: $FilterSchema,
            sortSchema:   $SortSchema,
            paramsSchema: $ParamsSchema,
        }),
    };
};

export type InferSourceSchema<TSourceSchema extends ISourceSchemas<ISourceSchema>> = ISourceSchema<
    TSourceSchema["EntitySchema"],
    TSourceSchema["ToCreateSchema"],
    TSourceSchema["CreateSchema"],
    TSourceSchema["PatchSchema"],
    TSourceSchema["FilterSchema"],
    TSourceSchema["SortSchema"],
    TSourceSchema["ParamsSchema"]
>;

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

    fetch(query: TSourceSchema["Query"]): Promise<TSourceSchema["Entity"]>;

    find(id: string): Promise<TSourceSchema["Entity"]>;
}

export namespace ISource {
    export interface IUpsert<TSourceSchema extends ISourceSchema> {
        create: TSourceSchema["Create"];
        patch: Omit<TSourceSchema["Patch"], "id">;
        filter: TSourceSchema["Filter"];
    }
}

export type ISourceStoreProps<TSourceSchema extends ISourceSchema> = IStoreProps<{
    readonly schema: TSourceSchema["EntitySchema"];
    readonly entities: TSourceSchema["Entity"][];
    readonly isLoading: boolean;
    readonly isFetching: boolean;

    setEntities(entities?: TSourceSchema["Entity"][]): void;

    setIsLoading(isLoading: boolean): void;

    setIsFetching(isFetching: boolean): void;
}>

export type ISourceStoreContext<TSourceSchema extends ISourceSchema> = IStoreContext<ISourceStoreProps<TSourceSchema>>;

export type IUseSourceState<TSourceSchema extends ISourceSchema> = IUseState<ISourceStoreProps<TSourceSchema>>;

export type IUseSourceQuery<TSourceSchema extends ISourceSchema> = {
    Query: IUseQuery<TSourceSchema["Query"] | undefined, TSourceSchema["Entity"][]>;
    Count: IUseQuery<TSourceSchema["Query"] | undefined, number>;
    Fetch: IUseQuery<TSourceSchema["Query"], TSourceSchema["Entity"]>;
    Find: IUseQuery<IWithIdentity, TSourceSchema["Entity"]>;
}

/**
 * Extended Source schemas; useful to specify close-to-db schemas (for example Prisma binding).
 */
export type ISourceExSchema<
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
> = {
    WhereSchema: TWhereSchema;
    Where: z.infer<TWhereSchema>;
    WhereUniqueSchema: TWhereUniqueSchema;
    WhereUnique: z.infer<TWhereUniqueSchema>;
    OrderBySchema: TOrderBySchema;
    OrderBy: z.infer<TOrderBySchema>;
}

export type ISourceExSchemas<
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
> = {
    WhereSchema: TWhereSchema;
    WhereUniqueSchema: TWhereUniqueSchema;
    OrderBySchema: TOrderBySchema;
}

export type IWithSourceExSchemaProps<
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
> = ISourceExSchemas<TWhereSchema, TWhereUniqueSchema, TOrderBySchema>;

export type InferSourceExSchema<TSourceExSchemas extends ISourceExSchemas<any, any, any>> = ISourceExSchema<TSourceExSchemas["WhereSchema"], TSourceExSchemas["WhereUniqueSchema"], TSourceExSchemas["OrderBySchema"]>;

export const withSourceExSchema = <
    TWhereSchema extends z.ZodType,
    TWhereUniqueSchema extends z.ZodType,
    TOrderBySchema extends z.ZodType,
>(props: IWithSourceExSchemaProps<TWhereSchema, TWhereUniqueSchema, TOrderBySchema>): ISourceExSchemas<TWhereSchema, TWhereUniqueSchema, TOrderBySchema> => {
    return props;
};
