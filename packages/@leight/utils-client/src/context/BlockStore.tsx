import {createStoreContext} from "@leight/context-client";
import {type IStoreProps}   from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                           from "react";

export type IBlockStoreProps = IStoreProps<{
    readonly isBlock: boolean;
    block(block?: boolean): void;
    unblock(): void;
}>

export const BlockStore = createStoreContext<IBlockStoreProps>({
    state: () => (set) => ({
        isBlock: false,
        block:   (block = true) => {
            set({isBlock: block});
        },
        unblock: () => {
            set({isBlock: false});
        },
    }),
    name:  "BlockStore",
    hint:  "Add BlockProvider."
});

export interface IBlockProviderProps extends Omit<ComponentProps<typeof BlockStore["Provider"]>, "state"> {
    isBlock?: boolean;
}

export const BlockProvider: FC<IBlockProviderProps> = ({isBlock = false, ...props}) => {
    return <BlockStore.Provider
        defaults={{isBlock}}
        {...props}
    />;
};
