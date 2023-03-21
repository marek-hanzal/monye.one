import {createStoreContext} from "@leight/context-client";
import {IStoreProps}        from "@leight/zustand";

export type ILoopsStoreProps = IStoreProps<{
    readonly isRunning: boolean;
    readonly current: number;

    inc(): void;

    dec(): void;
}>

export const {
                 Provider:         LoopsProvider,
                 useState:         useLoopsState,
                 useOptionalState: useOptionalLoopsState,
                 useStore:         useLoopsStore,
                 useOptionalStore: useOptionalLoopsStore,
             } = createStoreContext<ILoopsStoreProps>({
    state: () => (set, get) => ({
        get isRunning() {
            return get().current > 0;
        },
        current: 0,
        inc:     () => set(({current}) => ({current: current + 1})),
        dec:     () => set(({current}) => ({current: current - 1})),
    }),
    name:  "LoopsContext",
    hint:  "Add LoopsProvider."
});
