import {CursorSchema} from "@leight/cursor";
import {
    FilterSchema,
    type IFilterSchema
}                     from "@leight/filter";
import {
    type ISortSchema,
    SortSchema
}                     from "@leight/sort";
import {z}            from "zod";

export const ParamsSchema = z.object({});
export type IParamsSchema = typeof ParamsSchema;
export type IParams = z.infer<IParamsSchema>;

export const QuerySchema = <
    TFilterSchema extends z.ZodSchema = IFilterSchema,
    TSortSchema extends z.ZodSchema = ISortSchema,
    TParamsSchema extends z.ZodSchema = IParamsSchema,
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

export type IQuerySchema<
    TFilterSchema extends z.ZodSchema = IFilterSchema,
    TSortSchema extends z.ZodSchema = ISortSchema,
    TParamsSchema extends z.ZodSchema = IParamsSchema,
> = ReturnType<typeof QuerySchema<TFilterSchema, TSortSchema, TParamsSchema>>;

export type IQuery<
    TFilterSchema extends z.ZodSchema = IFilterSchema,
    TSortSchema extends z.ZodSchema = ISortSchema,
    TParamsSchema extends z.ZodSchema = IParamsSchema,
> = z.infer<IQuerySchema<
    TFilterSchema,
    TSortSchema,
    TParamsSchema
>>;

export interface IQuerySchemaProps<
    TFilterSchema extends z.ZodSchema = IFilterSchema,
    TSortSchema extends z.ZodSchema = ISortSchema,
    TParamsSchema extends z.ZodSchema = IParamsSchema,
> {
    filterSchema?: TFilterSchema;
    sortSchema?: TSortSchema;
    paramsSchema?: TParamsSchema;
}
