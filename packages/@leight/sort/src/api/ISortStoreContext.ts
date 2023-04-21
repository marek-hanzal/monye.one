import {
    type IStoreContext,
    type IUseState
}                         from "@leight/context";
import {z}                from "@leight/zod";
import {type IStoreProps} from "@leight/zustand";
import {
    type ISortOrder,
    type ISortSchema
}                         from "../schema";

export type ISortStoreProps<TSortSchema extends ISortSchema> = IStoreProps<{
    readonly schema: TSortSchema;
    readonly sort: z.infer<TSortSchema>;

    setSort(sort: keyof z.infer<TSortSchema>, order: ISortOrder): void;
}>

export type ISortStoreContext<TSortSchema extends ISortSchema> = IStoreContext<ISortStoreProps<TSortSchema>>;
export type IUseSortState<TSortSchema extends ISortSchema> = IUseState<ISortStoreProps<TSortSchema>>;
