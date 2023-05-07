import {type IStoreProps} from "@leight/zustand";
import {
    type IRepositoryMapperSchema,
    type RepositoryMapperType
}                         from "../repository";
import {type ISortOrder}  from "../schema";

export type IQueryStoreProps<
    TRepositoryMapperSchema extends IRepositoryMapperSchema,
    TRepositoryMapperType extends RepositoryMapperType = RepositoryMapperType<TRepositoryMapperSchema>
> = IStoreProps<{
    $id: string;

    $page: number;
    $size: number;

    $filter: TRepositoryMapperType["Filter"];
    /**
     * If set, all filter changes are shallow merged with this
     */
    $applyFilter?: TRepositoryMapperType["Filter"];
    $filterDto?: IQueryStoreProps.IFilterDto;
    $sort: TRepositoryMapperType["Sort"];

    $query: TRepositoryMapperType["Query"];

    setFilter(filter?: TRepositoryMapperType["Filter"]): void;
    applyFilter(filter?: TRepositoryMapperType["Filter"]): void;
    applyShallowFilter(filter?: TRepositoryMapperType["Filter"]): void;
    setShallowFilter(filter?: TRepositoryMapperType["Filter"]): void;
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

    setSort(sort: keyof TRepositoryMapperType["Sort"], order: ISortOrder): void;

    setSize(size: number): void;
    setPage(page: number): void;
}>;

export namespace IQueryStoreProps {
    export type IFilterDto = Record<string, any>;
}
