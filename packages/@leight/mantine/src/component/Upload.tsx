import { type IUseChunkProps, useChunk } from "@leight/core-client";
import { type FileWithPath } from "@mantine/dropzone";
import { type FC, useRef } from "react";
import { v4 } from "uuid";
import { Progress } from "@mantine/core";
import { type IHrefProps } from "@leight/core";

export interface IUploadProps
    extends Pick<IUseChunkProps, "onStart" | "onFinish"> {
    chunkHref: IHrefProps;
    commitHref: IHrefProps;
    file: FileWithPath;
}

// const defaultChunkSize = 1048576 * 4;
const defaultChunkSize = 1024 * 4;

/**
 * This component executes upload just as it's got rendered.
 *
 * Progress and other stuff are synced through Zustand Store.
 */
export const Upload: FC<IUploadProps> = ({
    chunkHref,
    commitHref,
    file,
    onStart,
    onFinish,
}) => {
    const uuid = useRef(v4());
    const { percent } = useChunk({
        chunk: defaultChunkSize,
        throttle: 500,
        size: file.size,
        async onTick({ current, total, start, end, size, percent }) {},
        onStart,
        onFinish: async (props) => {
            console.log("Calling commit on file", commitHref);
            return onFinish?.(props);
        },
    });

    // useEffect(() => {
    //     const totalChunkCount =
    //         file.size % defaultChunkSize == 0
    //             ? file.size / defaultChunkSize
    //             : Math.floor(file.size / defaultChunkSize) + 1;
    //     let chunkCurrent = 0;
    //     let chunkLength = defaultChunkSize;
    //
    //     console.log("ChunkCount", totalChunkCount);
    //
    //     for (let chunkCount = 0; chunkCount < totalChunkCount; chunkCount++) {
    //         // await axios.post(toHref({chunkId: uuid}), file.slice(chunkCurrent, chunkLength), {
    //         //     headers: {
    //         //         "Content-Type": "application/octet-stream",
    //         //     },
    //         //     onUploadProgress: event => setProgressSize(size => size + event.loaded),
    //         // });
    //         console.log(
    //             "uploading slice",
    //             uuid.current,
    //             chunkCurrent,
    //             chunkLength
    //         );
    //         console.log(
    //             "slice",
    //             uuid.current,
    //             file.slice(chunkCurrent, chunkLength)
    //         );
    //         chunkCurrent = chunkLength;
    //         chunkLength += defaultChunkSize;
    //         setTimeout(() => {
    //             console.log(
    //                 "Setting progress",
    //                 uuid.current,
    //                 (chunkCount / totalChunkCount) * 100
    //             );
    //             progress = (chunkCount / totalChunkCount) * 100;
    //         }, 2500);
    //     }
    //
    //     // commit here
    // }, [uuid.current]);

    return (
        <>
            <Progress
                color={"green"}
                radius={"md"}
                size={"md"}
                value={percent}
                animate
            />
        </>
    );
};
