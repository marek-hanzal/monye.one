import {z}                  from "@leight/utils";
import {
    CreateSchema,
    CursorSchema,
    DtoSchema,
    EntitySchema,
    FilterSchema,
    type ICreateSchema,
    type IDtoSchema,
    type IEntitySchema,
    type IFilterSchema,
    type IParamsSchema,
    type IPatchSchema,
    type ISortSchema,
    type IToCreateSchema,
    type IToPatchSchema,
    ParamsSchema,
    PatchSchema,
    SortSchema,
    ToCreateSchema,
    ToPatchSchema,
    WithIdentitySchema
}                           from "../schema";
import {type ISourceSchema} from "../source";

export interface IWithSourceSchemaProps<
    TEntitySchema extends IEntitySchema,
    TDtoSchema extends IDtoSchema,
    TToCreateSchema extends IToCreateSchema,
    TCreateSchema extends ICreateSchema,
    TToPatchSchema extends IToPatchSchema,
    TPatchSchema extends IPatchSchema,
    TFilterSchema extends IFilterSchema,
    TSortSchema extends ISortSchema,
    TParamsSchema extends IParamsSchema,
> {
    EntitySchema?: TEntitySchema;
    DtoSchema?: TDtoSchema;
    ToCreateSchema?: TToCreateSchema;
    CreateSchema?: TCreateSchema;
    ToPatchSchema?: TToPatchSchema;
    PatchSchema?: TPatchSchema;
    FilterSchema?: TFilterSchema;
    SortSchema?: TSortSchema;
    ParamsSchema?: TParamsSchema;
}

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
    }: IWithSourceSchemaProps<
        TEntitySchema,
        TDtoSchema,
        TToCreateSchema,
        TCreateSchema,
        TToPatchSchema,
        TPatchSchema,
        TFilterSchema,
        TSortSchema,
        TParamsSchema
    >): ISourceSchema<
    TEntitySchema,
    TDtoSchema,
    TToCreateSchema,
    TCreateSchema,
    TToPatchSchema,
    TPatchSchema,
    TFilterSchema,
    TSortSchema,
    TParamsSchema
> => {
    const Repository = {
        EntitySchema:       $EntitySchema,
        CreateSchema:       $CreateSchema,
        PatchSchema:        $PatchSchema,
        PatchSchemaProps:   z.object({
            patch:  $PatchSchema,
            filter: $FilterSchema,
        }),
        PatchBySchemaProps: z.object({
            patch:  $PatchSchema,
            filter: $FilterSchema,
        }),
        UpsertSchemaProps:  z.object({
            create: $CreateSchema,
            patch:  $PatchSchema,
            filter: $FilterSchema,
        }),
        QuerySchema:        z.object({
            filter: $FilterSchema.optional(),
            sort:   $SortSchema.optional(),
            cursor: CursorSchema.optional(),
            params: $ParamsSchema.optional(),
        }),
        CountSchema:        $FilterSchema,
        DeleteBySchema:     $FilterSchema,
        DeleteSchema:       WithIdentitySchema,
        Fetch$Schema:       $FilterSchema,
        FetchSchema:        $FilterSchema,
        FilterSchema:       $FilterSchema,
        SortSchema:         $SortSchema,
        ParamsSchema:       $ParamsSchema,
        CursorSchema,
    } as const;
    const Mapper = {
        ...Repository,
        DtoSchema:            $DtoSchema,
        ToCreateSchema:       $ToCreateSchema,
        ToPatchSchema:        $ToPatchSchema,
        ToPatchSchemaProps:   z.object({
            patch:  $ToPatchSchema,
            filter: $FilterSchema,
        }),
        ToPatchBySchemaProps: z.object({
            patch:  $ToPatchSchema,
            filter: $FilterSchema,
        }),
        ToUpsertSchemaProps:  z.object({
            create: $ToCreateSchema,
            patch:  $ToPatchSchema,
            filter: $FilterSchema,
        }),
    } as const;
    const Service = {
        ...Mapper,
    } as const;

    return {
        ...Service,
        Repository,
        Mapper,
        Service,
    };
};
