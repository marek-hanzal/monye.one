import {type IStoreProps} from "@leight/zustand";
import {type IRepositoryMapperSchema, type RepositoryMapperType} from "../repository";
import {type ISortOrder} from "../schema";

export type IQueryStoreProps<
    TRepositoryMapperSchema extends IRepositoryMapperSchema,
    TRepositoryMapperType extends RepositoryMapperType<TRepositoryMapperSchema> = RepositoryMapperType<TRepositoryMapperSchema>
> = IStoreProps<{
    page: number;
    size: number;

    filter: TRepositoryMapperType["Filter"];
    /**
     * If set, all filter changes are shallow merged with this
     */
    applyFilter?: TRepositoryMapperType["Filter"];
    filterDto?: IQueryStoreProps.IFilterDto;
    sort: TRepositoryMapperType["Sort"];

    query: TRepositoryMapperType["Query"];

    withFilter(filter?: TRepositoryMapperType["Filter"]): void;
    withApplyFilter(filter?: TRepositoryMapperType["Filter"]): void;
    withApplyShallowFilter(filter?: TRepositoryMapperType["Filter"]): void;
    withShallowFilter(filter?: TRepositoryMapperType["Filter"]): void;
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

    withSort(sort: keyof TRepositoryMapperType["Sort"], order: ISortOrder): void;

    withSize(size: number): void;
    withPage(page: number): void;
}>;

export namespace IQueryStoreProps {
    export type IFilterDto = Record<string, any>;
}
