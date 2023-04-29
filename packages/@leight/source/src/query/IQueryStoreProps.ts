import {type IStoreProps} from "@leight/zustand";
import {type ISortOrder}  from "../schema";
import {
    type ISourceSchema,
    type ISourceSchemaType
}                         from "../source";

export type IQueryStoreProps<TSourceSchemaType extends ISourceSchemaType> = IStoreProps<{
    $id: string;
    $schema: ISourceSchema.of<TSourceSchemaType>;

    $page: number;
    $size: number;

    $filter: TSourceSchemaType["Filter"];
    /**
     * If set, all filter changes are shallow merged with this
     */
    $applyFilter?: TSourceSchemaType["Filter"];
    $filterDto?: IQueryStoreProps.IFilterDto;
    $sort: TSourceSchemaType["Sort"];

    $query: TSourceSchemaType["Query"];

    setFilter(filter?: TSourceSchemaType["Filter"]): void;
    applyFilter(filter?: TSourceSchemaType["Filter"]): void;
    applyShallowFilter(filter?: TSourceSchemaType["Filter"]): void;
    setShallowFilter(filter?: TSourceSchemaType["Filter"]): void;
    setFilterDto(dto?: IQueryStoreProps.IFilterDto): void;

    setSort(sort: keyof TSourceSchemaType["Sort"], order: ISortOrder): void;

    setSize(size: number): void;
    setPage(page: number): void;
}>;

export namespace IQueryStoreProps {
    export type IFilterDto = Record<string, any>;
}
