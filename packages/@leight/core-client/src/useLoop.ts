import { useEffect, useRef, useState } from "react";

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
    /**
     * Changes to this will execute the loop.
     */
    const [current, setCurrent] = useState(0);
    const running = useRef(false);
    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (running.current) {
            return;
        }
        running.current = true;
        onStart({ total }).then(() => setCurrent(0));
    }, []);

    useEffect(() => {
        if (!running.current) {
            return;
        }
        if (current === total) {
            running.current = false;
            onFinish?.({})
                .then(() => {
                    setDone(true);
                })
                .catch((e) => {
                    console.error(e);
                    setError(true);
                    setDone(true);
                    onError(e);
                });
            return;
        }
        setTimeout(() => {
            onTick({
                current,
                total,
                percent: (100 * (current + 1)) / total,
            })
                .then(() => {
                    setCurrent((current) => current + 1);
                })
                .catch((e) => {
                    running.current = false;
                    console.error(e);
                    setError(true);
                    setDone(true);
                    onError(e);
                });
        }, throttle);
    }, [current]);

    return {
        idle: !running.current && !done,
        running: running.current,
        error,
        success: running ? undefined : !error,
        done,
        current,
        total,
        percent: (100 * current) / total,
    };
};
