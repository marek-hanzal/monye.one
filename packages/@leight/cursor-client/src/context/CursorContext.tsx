import {createStoreContext}     from "@leight/context-client";
import {type ICursorStoreProps} from "@leight/cursor";
import {generateId}             from "@leight/utils";
import {
    type ComponentProps,
    type FC
}                               from "react";

export const CursorStore = createStoreContext<ICursorStoreProps>({
    state: () => (set) => ({
        id:        generateId(),
        page:      0,
        size:      30,
        pages:     0,
        total:     0,
        isLoading: false,
        setSize(size) {
            set(({total}) => ({
                id:    generateId(),
                size,
                pages: Math.ceil(total / size),
            }));
        },
        setPage(page) {
            set({
                id: generateId(),
                page,
            });
        },
        setTotal(total) {
            set(({size}) => ({
                id:    generateId(),
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
