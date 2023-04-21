import {
    useEffect,
    useRef
} from "react";
import {
    LoopsStore,
    LoopStore
} from "../context";

export interface IOnStartProps {
    total: number;
}

export interface IOnTickProps {
    current: number;
    total: number;
    percent: number;
}

export interface IOnFinishProps {
}

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
export const useLoop = (
    {
        total,
        throttle = 0,
        onStart = () => Promise.resolve(),
        onTick,
        onError = () => Promise.resolve(),
        onFinish = () => Promise.resolve(),
    }: IUseLoopProps) => {
    const isMountedRef = useRef(false);
    const loopState    = LoopStore.useState();
    const loopsState   = LoopsStore.useOptionalState();

    useEffect(() => {
        if (isMountedRef.current || loopState.isRunning) {
            return;
        }
        isMountedRef.current = true;
        loopState.start(total);
        loopsState?.inc();
        (async () => {
            try {
                await onStart({total});
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    useEffect(() => {
        if (!loopState.isRunning) {
            return;
        }
        if (loopState.current === total) {
            onFinish?.({})
                .then(() => loopState.finish())
                .catch((e) => {
                    console.error(e);
                    loopState.finish(true);
                    onError(e);
                })
                .finally(() => {
                    loopsState?.dec();
                });
            return;
        }
        setTimeout(() => {
            onTick({
                current: loopState.current,
                total,
                percent: loopState.percent(),
            })
                .then(() => loopState.progress())
                .catch((e) => {
                    loopsState?.dec();
                    console.error(e);
                    loopState.finish(true);
                    onError(e);
                });
        }, throttle);
    }, [
        loopState.isRunning,
        loopState.current
    ]);

    return loopState;
};
