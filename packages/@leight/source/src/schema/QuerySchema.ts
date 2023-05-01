import {z}            from "@leight/zod";
import {CursorSchema} from "./CursorSchema";
import {
    FilterSchema,
    type IFilterSchema
}                     from "./FilterSchema";
import {
    type ISortSchema,
    SortSchema
}                     from "./SortSchema";

export const ParamsSchema = z.object({});
export type IParamsSchema = typeof ParamsSchema;
export type IParams = z.infer<IParamsSchema>;

export interface IQuerySchemaProps<
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> {
    filterSchema?: TFilterSchema;
    sortSchema?: TSortSchema;
    paramsSchema?: TParamsSchema;
}

export const QuerySchema = <
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
>({
      filterSchema,
      sortSchema,
      paramsSchema
  }: IQuerySchemaProps<TFilterSchema, TSortSchema, TParamsSchema>) => z.object({
    filter: (filterSchema || FilterSchema).optional(),
    sort:   (sortSchema || SortSchema).optional(),
    cursor: CursorSchema.optional(),
    params: (paramsSchema || ParamsSchema).optional(),
});

export type IQuery<
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> = z.infer<IQuerySchema<
    TFilterSchema,
    TSortSchema,
    TParamsSchema
>>;

export type IQuerySchema<
    TFilterSchema extends IFilterSchema = IFilterSchema,
    TSortSchema extends ISortSchema = ISortSchema,
    TParamsSchema extends IParamsSchema = IParamsSchema,
> = ReturnType<typeof QuerySchema<TFilterSchema, TSortSchema, TParamsSchema>>;
