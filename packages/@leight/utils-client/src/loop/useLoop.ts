import { useEffect } from "react";
import { useLoopStore } from "./useLoopStore";

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

    useEffect(() => {
        if (loopStore.isRunning) {
            return;
        }
        loopStore.setTotal(total);
        loopStore.running();
        (async () => await onStart({ total }))();
    }, []);

    useEffect(() => {
        if (!loopStore.isRunning) {
            return;
        }
        if (loopStore.current === total) {
            loopStore.running(false);
            onFinish?.({})
                .then(() => {
                    loopStore.done();
                })
                .catch((e) => {
                    console.error(e);
                    loopStore.error();
                    loopStore.done();
                    onError(e);
                });
            return;
        }
        setTimeout(() => {
            onTick({
                current: loopStore.current,
                total,
                percent: loopStore.percent(),
            })
                .then(() => {
                    loopStore.progress();
                })
                .catch((e) => {
                    console.error(e);
                    loopStore.running(false);
                    loopStore.error();
                    loopStore.done();
                    onError(e);
                });
        }, throttle);
    }, [loopStore.isRunning, loopStore.current]);

    return loopStore;
};
