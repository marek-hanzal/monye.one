"use client";

import {type IStoreProps} from "@leight/store";
import {createStore}      from "@leight/store-client";
import {
    type FC,
    type PropsWithChildren
}                         from "react";

export type IDrawerStoreProps = IStoreProps<{
    isOpened: Record<string, boolean>;
    open(id: string): void;
    close(id: string): void;
    setOpen(id: string, isOpened: boolean): void;
}>;

export const DrawerStore = createStore<IDrawerStoreProps>({
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

export type IDrawerStoreProviderProps = PropsWithChildren<{
    defaultOpened?: Record<string, boolean>;
}>

export const DrawerStoreProvider: FC<IDrawerStoreProviderProps> = (
    {
        defaultOpened,
        ...props
    }) => {
    return <DrawerStore.Provider
        defaults={{
            isOpened: defaultOpened || {},
        }}
        {...props}
    />;
};
