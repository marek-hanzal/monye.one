import {z}                  from "@leight/zod";
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
    return {
        Repository: {
            EntitySchema:   $EntitySchema,
            CreateSchema:   $CreateSchema,
            PatchSchema:    z.object({
                patch:  $PatchSchema,
                filter: $FilterSchema,
            }),
            PatchBySchema:  z.object({
                patch:  $PatchSchema,
                filter: $FilterSchema,
            }),
            UpsertSchema:   z.object({
                create: $CreateSchema,
                patch:  $PatchSchema,
                filter: $FilterSchema,
            }),
            QuerySchema:    z.object({
                filter: $FilterSchema.optional(),
                sort:   $SortSchema.optional(),
                cursor: CursorSchema.optional(),
                params: $ParamsSchema.optional(),
            }),
            CountSchema:    $FilterSchema,
            DeleteBySchema: $FilterSchema,
            DeleteSchema:   WithIdentitySchema,
            Fetch$Schema:   $FilterSchema,
            FetchSchema:    $FilterSchema,
            FilterSchema:   $FilterSchema,
            SortSchema:     $SortSchema,
            ParamsSchema:   $ParamsSchema,
        },
        Mapper:     {
            EntitySchema:   $EntitySchema,
            CreateSchema:   $CreateSchema,
            PatchSchema:    z.object({
                patch:  $PatchSchema,
                filter: $FilterSchema,
            }),
            PatchBySchema:  z.object({
                patch:  $PatchSchema,
                filter: $FilterSchema,
            }),
            UpsertSchema:   z.object({
                create: $CreateSchema,
                patch:  $PatchSchema,
                filter: $FilterSchema,
            }),
            QuerySchema:    z.object({
                filter: $FilterSchema.optional(),
                sort:   $SortSchema.optional(),
                cursor: CursorSchema.optional(),
                params: $ParamsSchema.optional(),
            }),
            CountSchema:    $FilterSchema,
            DeleteBySchema: $FilterSchema,
            DeleteSchema:   WithIdentitySchema,
            Fetch$Schema:   $FilterSchema,
            FetchSchema:    $FilterSchema,
            FilterSchema:   $FilterSchema,
            SortSchema:     $SortSchema,
            ParamsSchema:   $ParamsSchema,

            DtoSchema:      $DtoSchema,
            ToCreateSchema: $ToCreateSchema,
            ToPatchSchema:  $ToPatchSchema,
        },
        Service:    {
            EntitySchema:   $EntitySchema,
            CreateSchema:   $CreateSchema,
            PatchSchema:    z.object({
                patch:  $PatchSchema,
                filter: $FilterSchema,
            }),
            PatchBySchema:  z.object({
                patch:  $PatchSchema,
                filter: $FilterSchema,
            }),
            UpsertSchema:   z.object({
                create: $CreateSchema,
                patch:  $PatchSchema,
                filter: $FilterSchema,
            }),
            QuerySchema:    z.object({
                filter: $FilterSchema.optional(),
                sort:   $SortSchema.optional(),
                cursor: CursorSchema.optional(),
                params: $ParamsSchema.optional(),
            }),
            CountSchema:    $FilterSchema,
            DeleteBySchema: $FilterSchema,
            DeleteSchema:   WithIdentitySchema,
            Fetch$Schema:   $FilterSchema,
            FetchSchema:    $FilterSchema,
            FilterSchema:   $FilterSchema,
            SortSchema:     $SortSchema,
            ParamsSchema:   $ParamsSchema,

            DtoSchema:      $DtoSchema,
            ToCreateSchema: $ToCreateSchema,
            ToPatchSchema:  $ToPatchSchema,
        },
    };
};
