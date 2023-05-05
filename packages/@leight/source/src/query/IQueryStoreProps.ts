import {type IStoreProps} from "@leight/zustand";
import {
    type IRepositorySchema,
    type RepositoryType
}                         from "../repository";
import {type ISortOrder}  from "../schema";

export type IQueryStoreProps<TRepositorySchema extends IRepositorySchema, TRepositoryType extends RepositoryType = RepositoryType<TRepositorySchema>> = IStoreProps<{
    $id: string;
    $schema: TRepositorySchema;

    $page: number;
    $size: number;

    $filter: TRepositoryType["Filter"];
    /**
     * If set, all filter changes are shallow merged with this
     */
    $applyFilter?: TRepositoryType["Filter"];
    $filterDto?: IQueryStoreProps.IFilterDto;
    $sort: TRepositoryType["Sort"];

    $query: TRepositoryType["Query"];

    setFilter(filter?: TRepositoryType["Filter"]): void;
    applyFilter(filter?: TRepositoryType["Filter"]): void;
    applyShallowFilter(filter?: TRepositoryType["Filter"]): void;
    setShallowFilter(filter?: TRepositoryType["Filter"]): void;
    setFilterDto(dto?: IQueryStoreProps.IFilterDto): void;
    setShallowFilterDto(dto?: IQueryStoreProps.IFilterDto): void;
    /**
     * Is there active filter? Does not include applyFilter
     */
    hasFilter(): boolean;
    /**
     * Is there any applied filter?
     */
    hasApplyFilter(): boolean;

    setSort(sort: keyof TRepositoryType["Sort"], order: ISortOrder): void;

    setSize(size: number): void;
    setPage(page: number): void;
}>;

export namespace IQueryStoreProps {
    export type IFilterDto = Record<string, any>;
}
