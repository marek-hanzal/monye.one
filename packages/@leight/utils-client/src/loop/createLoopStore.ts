import { createStore } from "zustand";

export interface ILoopStoreProps {
    isRunning: boolean;
    isDone: boolean;
    isError: boolean;
    isSuccess?: boolean;
    current: number;
    total: number;

    setTotal(total: number): void;

    progress(): void;

    running(running?: boolean): void;

    done(done?: boolean): void;

    error(error?: boolean): void;

    percent(): number;
}

export const createLoopStore = () => {
    return createStore<ILoopStoreProps>((set, get) => ({
        total: 0,
        isRunning: false,
        isDone: false,
        isError: false,
        isSuccess: false,
        current: 0,
        setTotal: (total) => set({ total }),
        progress: () => set(({ current }) => ({ current: current + 1 })),
        running: (isRunning = true) => set({ isRunning }),
        done: (isDone = true) => set({ isDone, isSuccess: !get().isError }),
        error: (isError = true) => set({ isError, isSuccess: !isError }),
        percent: () => {
            const { current, total } = get();
            return (100 * current) / total;
        },
    }));
};
