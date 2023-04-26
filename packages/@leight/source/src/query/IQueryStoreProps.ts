import {type IStoreProps} from "@leight/zustand";
import {type ISortOrder}  from "../schema";
import {
    type ISourceSchema,
    type ISourceSchemaType
}                         from "../source";

export type IQueryStoreProps<TSourceSchemaType extends ISourceSchemaType> = IStoreProps<{
    schema: ISourceSchema.of<TSourceSchemaType>;

    filter: TSourceSchemaType["Filter"];
    sort: TSourceSchemaType["Sort"];

    setFilter(filter?: TSourceSchemaType["Filter"]): void;
    setShallowFilter(filter?: TSourceSchemaType["Filter"]): void;

    setSort(sort: keyof TSourceSchemaType["Sort"], order: ISortOrder): void;
}>;
