import { createStoreContext } from "@leight/context-client";

export interface ILoopsStoreProps {
    readonly isRunning: boolean;
    readonly current: number;

    inc(): void;

    dec(): void;
}

export const {
    Provider: LoopsProvider,
    useStore: useLoopsStore,
    useOptionalStore: useOptionalLoopsStore,
} = createStoreContext<ILoopsStoreProps>(
    (set, get) => ({
        get isRunning() {
            return get().current > 0;
        },
        current: 0,
        inc: () => set(({ current }) => ({ current: current + 1 })),
        dec: () => set(({ current }) => ({ current: current - 1 })),
    }),
    "LoopsContext",
    "Add LoopsProvider."
);
