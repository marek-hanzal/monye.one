import {type IStoreProps} from "@leight/zustand";
import {type ISortOrder}  from "../schema";
import {
    type ISourceSchema,
    type SourceType
}                         from "../source";

export type IQueryStoreProps<
    TSourceSchema extends ISourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
> = IStoreProps<{
    id: string;

    page: number;
    size: number;

    filter: TSourceType["Filter"];
    /**
     * If set, all filter changes are shallow merged with this
     */
    applyFilter?: TSourceType["Filter"];
    filterDto?: IQueryStoreProps.IFilterDto;
    sort: TSourceType["Sort"];

    query: TSourceType["Query"];

    withFilter(filter?: TSourceType["Filter"]): void;
    withApplyFilter(filter?: TSourceType["Filter"]): void;
    withApplyShallowFilter(filter?: TSourceType["Filter"]): void;
    withShallowFilter(filter?: TSourceType["Filter"]): void;
    withFilterDto(dto?: IQueryStoreProps.IFilterDto): void;
    withShallowFilterDto(dto?: IQueryStoreProps.IFilterDto): void;
    /**
     * Is there active filter? Does not include applyFilter
     */
    hasFilter(): boolean;
    /**
     * Is there any applied filter?
     */
    hasApplyFilter(): boolean;

    withSort(sort: keyof TSourceType["Sort"], order: ISortOrder): void;

    withSize(size: number): void;
    withPage(page: number): void;
}>;

export namespace IQueryStoreProps {
    export type IFilterDto = Record<string, any>;
}
