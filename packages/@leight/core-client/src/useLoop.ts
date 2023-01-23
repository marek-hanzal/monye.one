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

    onFinish?(props: IOnFinishProps): Promise<void>;
}

/**
 * Cool hook used to execute loop in renders to do something (for example file upload in chunks), so
 * the component stays responsive but one can still do the job.
 */
export const useLoop = ({
    total,
    throttle = 500,
    onStart = () => Promise.resolve(),
    onTick,
    onFinish = () => Promise.resolve(),
}: IUseLoopProps) => {
    const started = useRef(false);
    /**
     * Changes to this will execute the loop.
     */
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        if (started.current) {
            return;
        }
        started.current = true;
        onStart({ total }).then(() => setCurrent(0));
    }, []);

    useEffect(() => {
        if (!started.current) {
            return;
        }
        if (current === total) {
            started.current = false;
            onFinish?.({});
            return;
        }
        setTimeout(() => {
            onTick({
                current,
                total,
                percent: (100 * (current + 1)) / total,
            }).then(() => {
                setCurrent((current) => current + 1);
            });
        }, throttle);
    }, [current]);

    return {
        current,
        total,
        started: started.current,
    };
};
