import {type IStoreProvider} from "@leight/context";
import {createStoreContext}  from "@leight/context-client";
import {type IStoreProps}    from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                            from "react";

export type IDrawerStoreProps = IStoreProps<{
    isOpened: boolean;
    open(): void;
    close(): void;
    setOpen(isOpened: boolean): void;
}>;

export const DrawerStore = createStoreContext<IDrawerStoreProps>({
    state: () => (set) => ({
        isOpened: false,
        open:     () => set({isOpened: true}),
        close:    () => set({isOpened: false}),
        setOpen:  (isOpened) => set({isOpened}),
    }),
    name:  "DrawerStore",
    hint:  "Add DrawerStoreProvider",
});

export interface IDrawerStoreProviderProps extends ComponentProps<IStoreProvider<IDrawerStoreProps>> {
    defaultOpened?: boolean;
}

export const DrawerStoreProvider: FC<IDrawerStoreProviderProps> = ({defaultOpened, ...props}) => {
    return <DrawerStore.Provider
        defaults={{
            isOpened: defaultOpened,
        }}
        {...props}
    />;
};
