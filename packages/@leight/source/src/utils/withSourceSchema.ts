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
    ToPatchSchema
}                           from "../schema";
import {type ISourceSchema} from "../source";

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
> = Partial<ISourceSchema<TEntitySchema, TDtoSchema, TToCreateSchema, TCreateSchema, TToPatchSchema, TPatchSchema, TFilterSchema, TSortSchema, TParamsSchema>>;

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
    const $QuerySchema = QuerySchema<TFilterSchema, TSortSchema, TParamsSchema>({
        filterSchema: $FilterSchema,
        sortSchema:   $SortSchema,
        paramsSchema: $ParamsSchema,
    });
    return {
        EntitySchema:        $EntitySchema,
        DtoSchema:           $DtoSchema,
        ToCreateSchema:      $ToCreateSchema,
        CreateSchema:        $CreateSchema,
        ToPatchSchema:       $ToPatchSchema,
        PatchSchema:         $PatchSchema,
        FilterSchema:        $FilterSchema,
        UpsertSchema:        UpsertSchema<TToCreateSchema, TToPatchSchema, TFilterSchema>({
            toCreateSchema: $ToCreateSchema,
            toPatchSchema:  $ToPatchSchema,
            filterSchema:   $FilterSchema,
        }),
        SortSchema:          $SortSchema,
        ParamsSchema:        $ParamsSchema,
        CursorSchema:        CursorSchema,
        QuerySchema:         $QuerySchema,
        QueryOptionalSchema: $QuerySchema.optional(),
    };
};
