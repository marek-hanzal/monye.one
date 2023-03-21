import {createStoreContext} from "@leight/context-client";
import {type IStoreProps}   from "@leight/zustand";

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

export const {
                 Provider:         CursorProvider,
                 useState:         useCursorState,
                 useOptionalState: useOptionalCursorState,
                 useStore:         useCursorStore,
                 useOptionalStore: useOptionalCursorStore,
             } = createStoreContext<ICursorStoreProps>({
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
    name:  "CursorContext",
    hint:  "Add CursorProvider.",
});
