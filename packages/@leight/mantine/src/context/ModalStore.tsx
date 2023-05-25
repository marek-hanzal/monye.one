import {type IStoreProps} from "@leight/store";
import {createStore}      from "@leight/store-client";
import {
    type FC,
    type PropsWithChildren
}                         from "react";

export type IModalStoreProps = IStoreProps<{
    isOpened: Record<string, boolean>;
    open(id: string): void;
    close(id: string): void;
    setOpen(id: string, isOpened: boolean): void;
}>;

export const ModalStore = createStore<IModalStoreProps>({
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
    name:  "ModalStore",
    hint:  "Add ModalStoreProvider",
});

export type IModalStoreProviderProps = PropsWithChildren<{
    defaultOpened?: Record<string, boolean>;
}>;

export const ModalStoreProvider: FC<IModalStoreProviderProps> = (
    {
        defaultOpened,
        ...props
    }) => {
    return <ModalStore.Provider
        defaults={{
            isOpened: defaultOpened || {},
        }}
        {...props}
    />;
};
