import {type IStoreProps}   from "@leight/zustand";
import {type ISortOrder}    from "../schema";
import {type ISourceSchema} from "../source";

export type IQueryStoreProps<TSourceSchema extends ISourceSchema> = IStoreProps<{
    $id: string;
    $schema: TSourceSchema["Schema"]["Source"];

    $page: number;
    $size: number;

    $filter: TSourceSchema["Type"]["Source"]["Filter"];
    /**
     * If set, all filter changes are shallow merged with this
     */
    $applyFilter?: TSourceSchema["Type"]["Source"]["Filter"];
    $filterDto?: IQueryStoreProps.IFilterDto;
    $sort: TSourceSchema["Type"]["Source"]["Sort"];

    $query: TSourceSchema["Type"]["Source"]["Query"];

    setFilter(filter?: TSourceSchema["Type"]["Source"]["Filter"]): void;
    applyFilter(filter?: TSourceSchema["Type"]["Source"]["Filter"]): void;
    applyShallowFilter(filter?: TSourceSchema["Type"]["Source"]["Filter"]): void;
    setShallowFilter(filter?: TSourceSchema["Type"]["Source"]["Filter"]): void;
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

    setSort(sort: keyof TSourceSchema["Type"]["Source"]["Sort"], order: ISortOrder): void;

    setSize(size: number): void;
    setPage(page: number): void;
}>;

export namespace IQueryStoreProps {
    export type IFilterDto = Record<string, any>;
}
