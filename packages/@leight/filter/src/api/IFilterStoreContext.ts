import {
    type IStoreContext,
    type IUseState
}                           from "@leight/context";
import {z}                  from "@leight/zod";
import {type IStoreProps}   from "@leight/zustand";
import {type IFilterSchema} from "../schema";

export type IFilterStoreProps<TFilterSchema extends IFilterSchema> = IStoreProps<{
    id: string;
    schema: TFilterSchema;
    filter: z.infer<TFilterSchema>;

    setFilter(filter?: z.infer<TFilterSchema>): void;
    setShallowFilter(filter?: z.infer<TFilterSchema>): void;
}>;

export type IFilterStoreContext<TFilterSchema extends IFilterSchema> = IStoreContext<IFilterStoreProps<TFilterSchema>>;

export type IUseFilterState<TFilterSchema extends IFilterSchema> = IUseState<IFilterStoreProps<TFilterSchema>>;
