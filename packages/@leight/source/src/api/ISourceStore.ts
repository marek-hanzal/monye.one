import {
    type IStoreContext,
    type IUseState
}                                 from "@leight/context";
import {type IFilterStoreContext} from "@leight/filter";
import {type ISortStoreContext}   from "@leight/sort";
import {type IStoreProps}         from "@leight/zustand";
import {type ISourceSchema}       from "./ISourceSchema";

export type ISourceStore<TSourceSchema extends ISourceSchema> = {
    Source: ISourceStoreContext<TSourceSchema>;
    Filter: IFilterStoreContext<TSourceSchema["FilterSchema"]>;
    Sort: ISortStoreContext<TSourceSchema["SortSchema"]>;
};

export type ISourceStoreProps<TSourceSchema extends ISourceSchema> = IStoreProps<{
    readonly schema: TSourceSchema["DtoSchema"];
    readonly dtos: TSourceSchema["Dto"][];
    readonly isLoading: boolean;
    readonly isFetching: boolean;

    setDtos(dto?: TSourceSchema["Dto"][]): void;

    setIsLoading(isLoading: boolean): void;

    setIsFetching(isFetching: boolean): void;
}>

export type ISourceStoreContext<TSourceSchema extends ISourceSchema> = IStoreContext<ISourceStoreProps<TSourceSchema>>;

export type IUseSourceState<TSourceSchema extends ISourceSchema> = IUseState<ISourceStoreProps<TSourceSchema>>;
