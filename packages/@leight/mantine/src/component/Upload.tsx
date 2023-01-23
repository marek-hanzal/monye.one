import { IHrefProps, useChunk } from "@leight/core-client";
import { FileWithPath } from "@mantine/dropzone";
import { FC, useRef } from "react";
import { v4 } from "uuid";

export interface IUploadProps {
    href: IHrefProps;
    file: FileWithPath;
}

// const defaultChunkSize = 1048576 * 4;
const defaultChunkSize = 1024 * 4;

/**
 * This component executes upload just as it's got rendered.
 *
 * Progress and other stuff are synced through Zustand Store.
 */
export const Upload: FC<IUploadProps> = ({ href, file }) => {
    const uuid = useRef(v4());
    const { current, total } = useChunk({
        chunk: defaultChunkSize,
        throttle: 1000,
        size: file.size,
        async onStart() {
            console.log("UUID", uuid);
            console.log("Exetuing upload of", file, "to", href);
        },
        async onTick({ current, total, start, end, size, percent }) {
            console.log(
                "Tick",
                `${start} -> ${end} [${current}/${total}] ${percent.toFixed(
                    2
                )}%`,
                size
            );
        },
        async onFinish() {
            console.log("Done!");
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
            {current}/{total}
        </>
    );
};
