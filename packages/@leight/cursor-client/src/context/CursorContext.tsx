import {createStoreContext} from "@leight/context-client";
import {type IStoreProps}   from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                           from "react";

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

export const CursorStore = createStoreContext<ICursorStoreProps>({
    state: () => (set) => ({
        page:      0,
        size:      30,
        pages:     0,
        total:     0,
        isLoading: false,
        setSize(size) {
            set(({total}) => ({
                size,
                pages: Math.ceil(total / size),
            }));
        },
        setPage(page) {
            set({page});
        },
        setTotal(total) {
            set(({size}) => ({
                total,
                pages: Math.ceil(total / size),
            }));
        },
        setIsLoading(isLoading) {
            set({isLoading});
        },
    }),
    name:  "CursorStore",
    hint:  "Add CursorProvider.",
});

export interface ICursorProviderProps extends Omit<ComponentProps<typeof CursorStore["Provider"]>, "state"> {
}

export const CursorProvider: FC<ICursorProviderProps> = props => {
    return <CursorStore.Provider
        state={undefined}
        {...props}
    />;
};
