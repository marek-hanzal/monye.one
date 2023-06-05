import {
    type IOnTickProps,
    type IUseLoopProps,
    useLoop
} from "./useLoop";

export interface IUseChunkTickProps {
    current: number;
    total: number;
    start: number;
    end: number;
    size: number;
    percent: number;
}

export interface IUseChunkProps
    extends Pick<
        IUseLoopProps,
        "onStart" | "onFinish" | "onError" | "throttle"
    > {
    /**
     * Default chunk (page, whatever) size
     */
    chunk: number;
    /**
     * Total size of the chunked item
     */
    size: number;

    onTick(props: IUseChunkTickProps): Promise<void>;
}

export const useChunk = (
    {
        size,
        throttle,
        chunk,
        onStart,
        onTick,
        onFinish,
        onError,
    }: IUseChunkProps) => {
    return useLoop({
        total: Math.ceil(size / chunk),
        throttle,
        onStart,
        async onTick({
                         total,
                         current,
                         percent
                     }: IOnTickProps): Promise<void> {
            return onTick({
                start: current * chunk,
                end:   Math.min(current * chunk + chunk, size),
                total,
                current,
                size,
                percent,
            });
        },
        onFinish,
        onError,
    });
};
