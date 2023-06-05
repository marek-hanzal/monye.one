"use client";

import {type IStoreProps} from "@leight/store";
import {createStore}      from "@leight/store-client";
import {
    type FC,
    type PropsWithChildren
}                         from "react";

export type IBlockStoreProps = IStoreProps<{
    readonly isBlock: boolean;
    block(block?: boolean): void;
    unblock(): void;
}>

export const BlockStore = createStore<IBlockStoreProps>({
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

export type IBlockProviderProps = PropsWithChildren<{
    isBlock?: boolean;
}>

export const BlockProvider: FC<IBlockProviderProps> = (
    {
        isBlock = false,
        ...props
    }) => {
    return <BlockStore.Provider
        defaults={{isBlock}}
        {...props}
    />;
};
