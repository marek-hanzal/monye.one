import {
    type IStoreContext,
    type IUseState
}                         from "@leight/context";
import {type IStoreProps} from "@leight/zustand";

export type ICursorStoreProps = IStoreProps<{
    readonly page: number;
    readonly size: number;
    readonly pages: number;
    readonly total: number;
    readonly isLoading: boolean;

    setSize(size: number): void;

    setPage(page: number): void;

    setTotal(total: number): void;

    setIsLoading(isLoading: boolean): void;
}>

export type ICursorStoreContext = IStoreContext<ICursorStoreProps>;
export type IUseCursorState = IUseState<ICursorStoreProps>;
