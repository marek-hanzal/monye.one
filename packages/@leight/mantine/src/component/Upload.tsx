import { type IUseChunkProps, toHref, useChunk } from "@leight/core-client";
import { type FileWithPath } from "@mantine/dropzone";
import { type FC, useRef } from "react";
import { v4 } from "uuid";
import { Progress } from "@mantine/core";
import { type IHrefProps } from "@leight/core";
import axios from "axios";
import { type IChunkService } from "@leight/file";

export interface IUploadProps
    extends Pick<IUseChunkProps, "onStart" | "onFinish"> {
    chunkHref?: IHrefProps;
    commitHref?: IHrefProps;
    file: FileWithPath;
    path: string;
}

// const defaultChunkSize = 1048576 * 4;
const defaultChunkSize = 1024 * 4;

/**
 * This component executes upload just as it's got rendered.
 *
 * Progress and other stuff are synced through Zustand Store.
 */
export const Upload: FC<IUploadProps> = ({
    chunkHref = { href: "/api/file/chunk/{chunkId}/upload" },
    commitHref = { href: "/api/file/chunk/commit" },
    file,
    path,
    onStart,
    onFinish,
}) => {
    const uuid = useRef(v4());
    const { percent } = useChunk({
        chunk: defaultChunkSize,
        throttle: 500,
        size: file.size,
        async onTick({ start, end }) {
            await axios.post(
                toHref({ ...chunkHref, query: { chunkId: uuid.current } }),
                file.slice(start, end),
                {
                    headers: {
                        "Content-Type": "application/octet-stream",
                    },
                }
            );
        },
        onStart,
        onFinish: async (props) => {
            await axios.post<any, unknown, IChunkService.CommitProps>(
                toHref({ ...commitHref, query: { chunkId: uuid.current } }),
                {
                    name: file.name,
                    path,
                    chunkId: uuid.current,
                }
            );
            return onFinish?.(props);
        },
    });

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
