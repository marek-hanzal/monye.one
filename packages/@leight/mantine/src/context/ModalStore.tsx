import {createStoreContext} from "@leight/context-client";
import {
    type IStoreProps,
    type IStoreProviderComponent
}                           from "@leight/store";
import {
    type ComponentProps,
    type FC
}                           from "react";

export type IModalStoreProps = IStoreProps<{
    isOpened: Record<string, boolean>;
    open(id: string): void;
    close(id: string): void;
    setOpen(id: string, isOpened: boolean): void;
}>;

export const ModalStore = createStoreContext<IModalStoreProps>({
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

export interface IModalStoreProviderProps extends ComponentProps<IStoreProviderComponent<IModalStoreProps>> {
    defaultOpened?: Record<string, boolean>;
}

export const ModalStoreProvider: FC<IModalStoreProviderProps> = ({
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
