import {type IStoreProps} from "@leight/zustand";
import {type ISortOrder}  from "../schema";
import {
    type ISourceSchema,
    type ISourceSchemaType
}                         from "../source";

export type IQueryStoreProps<TSourceSchemaType extends ISourceSchemaType> = IStoreProps<{
    id: string;
    schema: ISourceSchema.of<TSourceSchemaType>;

    page: number;
    size: number;

    filter: TSourceSchemaType["Filter"];
    filterDto?: Record<string, any>;
    sort: TSourceSchemaType["Sort"];

    query: TSourceSchemaType["Query"];

    setFilter(filter?: TSourceSchemaType["Filter"], dto?: Record<string, any>): void;
    setShallowFilter(filter?: TSourceSchemaType["Filter"], dto?: Record<string, any>): void;

    setSort(sort: keyof TSourceSchemaType["Sort"], order: ISortOrder): void;

    setSize(size: number): void;
    setPage(page: number): void;
}>;
