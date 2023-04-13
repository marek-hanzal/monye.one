import {type IUseState}   from "@leight/context";
import {z}                from "@leight/zod";
import {type IStoreProps} from "@leight/zustand";

export const FilterSchema = z.object({
    id:       z.string().optional(),
    fulltext: z.string().optional(),
});
export type IFilterSchema =
    typeof FilterSchema
    | z.ZodType;
export type IFilter = z.infer<IFilterSchema>;

export type IFilterStoreProps<TFilterSchema extends IFilterSchema> = IStoreProps<{
    readonly schema: TFilterSchema;
    readonly filter: z.infer<TFilterSchema>;

    setFilter(filter?: z.infer<TFilterSchema>): void;
}>

export type IUseFilterState<TFilterSchema extends IFilterSchema> = IUseState<IFilterStoreProps<TFilterSchema>>;
