import {type FileSource, type IChunkService, type IFileWithPath} from "@leight/file";
import {type IHrefProps} from "@leight/utils";
import {type IOnFinishProps, type IUseChunkProps, toHref, useChunk} from "@leight/utils-client";
import axios from "axios";
import {useRef} from "react";
import {v4} from "uuid";

const defaultChunkSize = 1048576 * 4;

export interface IUseUploadProps
    extends Pick<IUseChunkProps, "onStart" | "onError"> {
    chunkHref?: IHrefProps;
    commitHref?: IHrefProps;
    file: IFileWithPath;
    path: string;
    replace?: boolean;

    onFinish?(props: IOnFinishProps & { file: FileSource["Type"]["Entity"] }): Promise<void>;
}

export const useUpload = (
    {
        file,
        path,
        chunkHref = {href: "/api/file/chunk/{chunkId}/upload"},
        commitHref = {href: "/api/file/chunk/commit"},
        onStart,
        onFinish,
        onError,
        replace = true,
    }: IUseUploadProps) => {
    const uuid = useRef(v4());
    return useChunk({
        chunk: defaultChunkSize,
        throttle: 0,
        size: file.size,
        async onTick({start, end}) {
            return axios.post(
                toHref({...chunkHref, query: {chunkId: uuid.current}}),
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
            return axios
                .post<unknown, { data: FileSource["Type"]["Dto"] }, IChunkService.CommitProps>(
                    toHref({...commitHref, query: {chunkId: uuid.current}}),
                    {
                        name: file.name,
                        path,
                        mime: file.type,
                        chunkId: uuid.current,
                        replace,
                    }
                )
                .then(({data}) => onFinish?.({...props, file: data}));
        },
        onError,
    });
};
