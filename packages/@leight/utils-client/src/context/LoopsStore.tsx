import {type IStoreProps} from "@leight/store";
import {createStore}      from "@leight/store-client";
import {
    type FC,
    type PropsWithChildren
}                         from "react";

export type ILoopsStoreProps = IStoreProps<{
    readonly current: number;

    isRunning(): boolean;

    inc(): void;

    dec(): void;
}>

export const LoopsStore = createStore<ILoopsStoreProps>({
    state: () => (set, get) => ({
        current: 0,
        isRunning() {
            return get().current > 0;
        },
        inc: () => set(({current}) => ({current: current + 1})),
        dec: () => set(({current}) => ({current: current - 1})),
    }),
    name:  "LoopsStore",
    hint:  "Add LoopsProvider."
});

export type ILoopsProviderProps = PropsWithChildren;

export const LoopsProvider: FC<ILoopsProviderProps> = props => {
    return <LoopsStore.Provider
        {...props}
    />;
};
