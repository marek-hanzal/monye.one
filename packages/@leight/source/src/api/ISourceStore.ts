import {
    type IStoreContext,
    type IUseState
}                                 from "@leight/context";
import {type IFilterStoreContext} from "@leight/filter";
import {type ISortStoreContext}   from "@leight/sort";
import {type IStoreProps}         from "@leight/zustand";
import {type ISourceSchemaType}   from "./ISourceSchemaType";

export type ISourceStore<TSourceSchemaType extends ISourceSchemaType> = {
    Source: ISourceStoreContext<TSourceSchemaType>;
    Filter: IFilterStoreContext<TSourceSchemaType["FilterSchema"]>;
    Sort: ISortStoreContext<TSourceSchemaType["SortSchema"]>;
};

export type ISourceStoreProps<TSourceSchemaType extends ISourceSchemaType> = IStoreProps<{
    id: string;
    schema: TSourceSchemaType["DtoSchema"];
    dtos: TSourceSchemaType["Dto"][];
    isLoading: boolean;
    isFetching: boolean;

    setDtos(dto?: TSourceSchemaType["Dto"][]): void;

    setIsLoading(isLoading: boolean): void;

    setIsFetching(isFetching: boolean): void;
}>

export type ISourceStoreContext<TSourceSchemaType extends ISourceSchemaType> = IStoreContext<ISourceStoreProps<TSourceSchemaType>>;

export type IUseSourceState<TSourceSchemaType extends ISourceSchemaType> = IUseState<ISourceStoreProps<TSourceSchemaType>>;
