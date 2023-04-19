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
    type IFilterSchema,
    type IFilterStoreContext
}                         from "@leight/filter";
import {
    type IParamsSchema,
    type IQuery,
    type IQuerySchema,
    ParamsSchema,
    QuerySchema
}                         from "@leight/query";
import {
    type IUseMutation,
    type IUseQuery
}                         from "@leight/react-query";
import {
    type ISortSchema,
    type ISortStoreContext,
    SortSchema
}                         from "@leight/sort";
import {type IToString}   from "@leight/utils";
import {z}                from "@leight/zod";
import {type IStoreProps} from "@leight/zustand";
import {
    CreateSchema,
    DtoSchema,
    EntitySchema,
    type ICreateSchema,
    type IDtoSchema,
    type IEntitySchema,
    type IPatchSchema,
    type IToCreateSchema,
    type IToPatchSchema,
    type IWithIdentity,
    PatchSchema,
    ToCreateSchema,
    ToPatchSchema
}                         from "../schema";

export type ISourceName =
    string
    | IToString;

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

export type ISourceSchemas<TSourceSchema extends ISourceSchema> = {
    EntitySchema: TSourceSchema["EntitySchema"];
    DtoSchema: TSourceSchema["DtoSchema"];
    ToCreateSchema: TSourceSchema["ToCreateSchema"];
    CreateSchema: TSourceSchema["CreateSchema"];
    ToPatchSchema: TSourceSchema["ToPatchSchema"];
    PatchSchema: TSourceSchema["PatchSchema"];
    FilterSchema: TSourceSchema["FilterSchema"];
    SortSchema: TSourceSchema["SortSchema"];
    ParamsSchema: TSourceSchema["ParamsSchema"];
    CursorSchema: TSourceSchema["CursorSchema"];
    QuerySchema: TSourceSchema["QuerySchema"];
}

export type IWithSourceSchemaProps<
    TEntitySchema extends IEntitySchema,
    TDtoSchema extends IDtoSchema,
    TToCreateSchema extends IToCreateSchema,
    TCreateSchema extends ICreateSchema,
    TToPatchSchema extends IToPatchSchema,
    TPatchSchema extends IPatchSchema,
    TFilterSchema extends IFilterSchema,
    TSortSchema extends ISortSchema,
    TParamsSchema extends IParamsSchema,
> = Partial<ISourceSchemas<ISourceSchema<TEntitySchema, TDtoSchema, TToCreateSchema, TCreateSchema, TToPatchSchema, TPatchSchema, TFilterSchema, TSortSchema, TParamsSchema>>>;

export const withSourceSchema = <
    TEntitySchema extends IEntitySchema,
    TDtoSchema extends IDtoSchema,
    TToCreateSchema extends IToCreateSchema,
    TCreateSchema extends ICreateSchema,
    TToPatchSchema extends IToPatchSchema,
    TPatchSchema extends IPatchSchema,
    TFilterSchema extends IFilterSchema,
    TSortSchema extends ISortSchema,
    TParamsSchema extends IParamsSchema,
>(
    {
        EntitySchema:   $EntitySchema = EntitySchema as TEntitySchema,
        DtoSchema:      $DtoSchema = DtoSchema as TDtoSchema,
        ToCreateSchema: $ToCreateSchema = ToCreateSchema as TToCreateSchema,
        CreateSchema:   $CreateSchema = CreateSchema as TCreateSchema,
        ToPatchSchema:  $ToPatchSchema = ToPatchSchema as TToPatchSchema,
        PatchSchema:    $PatchSchema = PatchSchema as TPatchSchema,
        FilterSchema:   $FilterSchema = FilterSchema as TFilterSchema,
        SortSchema:     $SortSchema = SortSchema as TSortSchema,
        ParamsSchema:   $ParamsSchema = ParamsSchema as TParamsSchema,
    }: IWithSourceSchemaProps<TEntitySchema, TDtoSchema, TToCreateSchema, TCreateSchema, TToPatchSchema, TPatchSchema, TFilterSchema, TSortSchema, TParamsSchema>): ISourceSchemas<ISourceSchema<TEntitySchema, TDtoSchema, TToCreateSchema, TCreateSchema, TToPatchSchema, TPatchSchema, TFilterSchema, TSortSchema, TParamsSchema>> => {
    return {
        EntitySchema:   $EntitySchema,
        DtoSchema:      $DtoSchema,
        ToCreateSchema: $ToCreateSchema,
        CreateSchema:   $CreateSchema,
        ToPatchSchema:  $ToPatchSchema,
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
    TSourceSchema["DtoSchema"],
    TSourceSchema["ToCreateSchema"],
    TSourceSchema["CreateSchema"],
    TSourceSchema["ToPatchSchema"],
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

    delete(withIdentity: IWithIdentity): Promise<TSourceSchema["Entity"]>;

    deleteWith(query: TSourceSchema["Query"]): Promise<TSourceSchema["Entity"][]>;

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
    readonly schema: TSourceSchema["DtoSchema"];
    readonly dtos: TSourceSchema["Dto"][];
    readonly isLoading: boolean;
    readonly isFetching: boolean;

    setDtos(dto?: TSourceSchema["Dto"][]): void;

    setIsLoading(isLoading: boolean): void;

    setIsFetching(isFetching: boolean): void;
}>

export type ISourceStoreContext<TSourceSchema extends ISourceSchema> = IStoreContext<ISourceStoreProps<TSourceSchema>>;

export type IUseSourceState<TSourceSchema extends ISourceSchema> = IUseState<ISourceStoreProps<TSourceSchema>>;

export type IUseSourceQuery<TSourceSchema extends ISourceSchema> = {
    useCreate: IUseMutation<TSourceSchema["ToCreate"], TSourceSchema["Dto"]>;
    usePatch: IUseMutation<TSourceSchema["ToPatch"], TSourceSchema["Dto"]>;
    useDelete: IUseMutation<IWithIdentity, TSourceSchema["Dto"]>;
    useDeleteWith: IUseMutation<TSourceSchema["Query"], TSourceSchema["Dto"][]>;
    useQuery: IUseQuery<TSourceSchema["Query"] | undefined, TSourceSchema["Dto"][]>;
    useCount: IUseQuery<TSourceSchema["Query"] | undefined, number>;
    useFetch: IUseQuery<TSourceSchema["Query"], TSourceSchema["Dto"]>;
    useFind: IUseQuery<IWithIdentity, TSourceSchema["Dto"]>;
};

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

export type ISourceStore<TSourceSchema extends ISourceSchema> = {
    Source: ISourceStoreContext<TSourceSchema>;
    Filter: IFilterStoreContext<TSourceSchema["FilterSchema"]>;
    Sort: ISortStoreContext<TSourceSchema["SortSchema"]>;
};
