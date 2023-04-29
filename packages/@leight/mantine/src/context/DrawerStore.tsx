import {type IStoreProvider} from "@leight/context";
import {createStoreContext}  from "@leight/context-client";
import {type IStoreProps}    from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                            from "react";

export type IDrawerStoreProps = IStoreProps<{
    isOpened: Record<string, boolean>;
    open(id: string): void;
    close(id: string): void;
    setOpen(id: string, isOpened: boolean): void;
}>;

export const DrawerStore = createStoreContext<IDrawerStoreProps>({
    state: () => set => ({
        isOpened: {},
        open:     id => set(state => ({
            isOpened: {
                ...state.isOpened,
                [id]: true,
            },
        })),
        close:    id => set(state => ({
            isOpened: {
                ...state.isOpened,
                [id]: false,
            },
        })),
        setOpen:  (id, isOpened) => set(state => ({
            isOpened: {
                ...state.isOpened,
                [id]: isOpened,
            },
        })),
    }),
    name:  "DrawerStore",
    hint:  "Add DrawerStoreProvider",
});

export interface IDrawerStoreProviderProps extends ComponentProps<IStoreProvider<IDrawerStoreProps>> {
    defaultOpened?: Record<string, boolean>;
}

export const DrawerStoreProvider: FC<IDrawerStoreProviderProps> = ({defaultOpened, ...props}) => {
    return <DrawerStore.Provider
        defaults={{
            isOpened: defaultOpened || {},
        }}
        {...props}
    />;
};
