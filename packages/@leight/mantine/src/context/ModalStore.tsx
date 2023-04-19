import {type IStoreProvider} from "@leight/context";
import {createStoreContext}  from "@leight/context-client";
import {type IStoreProps}    from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                            from "react";

export type IModalStoreProps = IStoreProps<{
    isOpened: boolean;
    open(): void;
    close(): void;
    setOpen(isOpened: boolean): void;
}>;

export const ModalStore = createStoreContext<IModalStoreProps>({
    state: () => (set) => ({
        isOpened: false,
        open:     () => set({isOpened: true}),
        close:    () => set({isOpened: false}),
        setOpen:  (isOpened) => set({isOpened}),
    }),
    name:  "ModalStore",
    hint:  "Add ModalStoreProvider",
});

export interface IModalStoreProviderProps extends ComponentProps<IStoreProvider<IModalStoreProps>> {
    defaultOpened?: boolean;
}

export const ModalStoreProvider: FC<IModalStoreProviderProps> = ({defaultOpened, ...props}) => {
    return <ModalStore.Provider
        defaults={{
            isOpened: defaultOpened,
        }}
        {...props}
    />;
};
