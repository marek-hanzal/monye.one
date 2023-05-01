import {z}                  from "@leight/zod";
import {type IFilterSchema} from "./FilterSchema";
import {
    type IToCreateSchema,
    type IToPatchSchema
}                           from "./SourceSchema";

export interface IUpsertSchemaProps<
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
> {
    toCreateSchema: TToCreateSchema;
    toPatchSchema: TToPatchSchema;
    filterSchema: TFilterSchema;
}

export const UpsertSchema = <
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
>({
      toCreateSchema,
      toPatchSchema,
      filterSchema
  }: IUpsertSchemaProps<TToCreateSchema, TToPatchSchema, TFilterSchema>) => z.object({
    toCreate: toCreateSchema,
    toPatch:  toPatchSchema,
    filter:   filterSchema,
});

export type IUpsert<
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
> = z.infer<IUpsertSchema<
    TToCreateSchema,
    TToPatchSchema,
    TFilterSchema
>>;

export type IUpsertSchema<
    TToCreateSchema extends IToCreateSchema = IToCreateSchema,
    TToPatchSchema extends IToPatchSchema = IToPatchSchema,
    TFilterSchema extends IFilterSchema = IFilterSchema,
> = ReturnType<typeof UpsertSchema<
    TToCreateSchema,
    TToPatchSchema,
    TFilterSchema
>>;
