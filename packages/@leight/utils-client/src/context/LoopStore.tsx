import {createStoreContext} from "@leight/context-client";
import {type IStoreProps}   from "@leight/zustand";
import {
    type ComponentProps,
    type FC
}                           from "react";

export type ILoopStoreProps = IStoreProps<{
    readonly isRunning: boolean;
    readonly isDone: boolean;
    readonly isError: boolean;
    readonly isSuccess?: boolean;
    readonly current: number;
    readonly total: number;

    progress(): void;

    start(total: number): void;

    finish(withError?: boolean): void;

    error(error?: boolean): void;

    percent(): number;
}>

export const LoopStore = createStoreContext<ILoopStoreProps>({
    state: () => (set, get) => ({
        total:     0,
        isRunning: false,
        isDone:    false,
        isError:   false,
        isSuccess: false,
        current:   0,
        progress:  () => set(({current}) => ({current: current + 1})),
        start:     (total) => set({isRunning: true, total}),
        finish:    (withError = false) =>
                       set({
                           isDone:    true,
                           isRunning: false,
                           isError:   withError,
                           isSuccess: !withError,
                       }),
        error:     (isError = true) => set({isError, isSuccess: !isError}),
        percent:   () => {
            const {current, total} = get();
            return (100 * current) / total;
        },
    }),
    name:  "LoopStore",
    hint:  "Add LoopProvider."
});

export interface ILoopProviderProps extends Omit<ComponentProps<typeof LoopStore["Provider"]>, "state"> {
}

export const LoopProvider: FC<ILoopProviderProps> = props => {
    return <LoopStore.Provider
        {...props}
    />;
};
