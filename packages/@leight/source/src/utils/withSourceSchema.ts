import {CursorSchema}        from "@leight/cursor";
import {
    FilterSchema,
    type IFilterSchema
}                            from "@leight/filter";
import {
    type IParamsSchema,
    ParamsSchema,
    QuerySchema
}                            from "@leight/query";
import {
    type ISortSchema,
    SortSchema
}                            from "@leight/sort";
import {type ISourceSchema,} from "../api";
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
    PatchSchema,
    ToCreateSchema,
    ToPatchSchema
}                            from "../schema";

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
    const $QuerySchema = QuerySchema({
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
        SortSchema:          $SortSchema,
        ParamsSchema:        $ParamsSchema,
        CursorSchema:        CursorSchema,
        QuerySchema:         $QuerySchema,
        QueryOptionalSchema: $QuerySchema.optional(),
    };
};
