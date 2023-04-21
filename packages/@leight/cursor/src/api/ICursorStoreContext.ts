import {
    type IStoreContext,
    type IUseState
}                         from "@leight/context";
import {type IStoreProps} from "@leight/zustand";

export type ICursorStoreProps = IStoreProps<{
    id: string;
    page: number;
    size: number;
    pages: number;
    total: number;
    isLoading: boolean;

    setSize(size: number): void;

    setPage(page: number): void;

    setTotal(total: number): void;

    setIsLoading(isLoading: boolean): void;
}>

export type ICursorStoreContext = IStoreContext<ICursorStoreProps>;
export type IUseCursorState = IUseState<ICursorStoreProps>;
