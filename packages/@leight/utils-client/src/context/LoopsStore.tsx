import {createStoreContext} from "@leight/context-client";
import {type IStoreProps}   from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                           from "react";

export type ILoopsStoreProps = IStoreProps<{
    readonly current: number;

    isRunning(): boolean;

    inc(): void;

    dec(): void;
}>

export const LoopsStore = createStoreContext<ILoopsStoreProps>({
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

export interface ILoopsProviderProps extends Omit<ComponentProps<typeof LoopsStore["Provider"]>, "state"> {
}

export const LoopsProvider: FC<ILoopsProviderProps> = props => {
    return <LoopsStore.Provider
        {...props}
    />;
};
