import { useEffect } from "react";
import { useLoopStore } from "./useLoopStore";
import { useOptionalLoopsStore } from "./useLoopsStore";

export interface IOnStartProps {
    total: number;
}

export interface IOnTickProps {
    current: number;
    total: number;
    percent: number;
}

export interface IOnFinishProps {}

export interface IUseLoopProps {
    total: number;
    /**
     * Number of ms to throttle the loop; using setTimeout at the end.
     */
    throttle?: number;

    onStart?(props: IOnStartProps): Promise<void>;

    onTick(props: IOnTickProps): Promise<void>;

    onError?(e: unknown): void;

    onFinish?(props: IOnFinishProps): Promise<void>;
}

/**
 * Cool hook used to execute loop in renders to do something (for example file upload in chunks), so
 * the component stays responsive but one can still do the job.
 */
export const useLoop = ({
    total,
    throttle = 0,
    onStart = () => Promise.resolve(),
    onTick,
    onError = () => Promise.resolve(),
    onFinish = () => Promise.resolve(),
}: IUseLoopProps) => {
    const loopStore = useLoopStore();
    const loopsStore = useOptionalLoopsStore();

    useEffect(() => {
        if (loopStore.isRunning) {
            return;
        }
        loopStore.start(total);
        loopsStore?.inc();
        (async () => await onStart({ total }))();
    }, []);

    useEffect(() => {
        if (!loopStore.isRunning) {
            return;
        }
        if (loopStore.current === total) {
            onFinish?.({})
                .then(() => loopStore.finish())
                .catch((e) => {
                    console.error(e);
                    loopStore.finish(true);
                    onError(e);
                })
                .finally(() => {
                    loopsStore?.dec();
                });
            return;
        }
        setTimeout(() => {
            onTick({
                current: loopStore.current,
                total,
                percent: loopStore.percent(),
            })
                .then(() => loopStore.progress())
                .catch((e) => {
                    loopsStore?.dec();
                    console.error(e);
                    loopStore.finish(true);
                    onError(e);
                });
        }, throttle);
    }, [loopStore.isRunning, loopStore.current]);

    return loopStore;
};
