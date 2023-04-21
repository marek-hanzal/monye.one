import {createStoreContext} from "@leight/context-client";
import {ICursorStoreProps}  from "@leight/cursor";
import {
    type ComponentProps,
    type FC
}                           from "react";

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
        {...props}
    />;
};
