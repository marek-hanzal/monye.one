import {IHrefProps}   from "@leight/core-client";
import {FileWithPath} from "@mantine/dropzone";
import {
    FC,
    useEffect,
    useRef
}                     from "react";
import {v4}           from "uuid";

export interface IUploadProps {
    href: IHrefProps;
    file: FileWithPath;
}

// const defaultChunkSize = 1048576 * 4;
const defaultChunkSize = 1024;

/**
 * This component executes upload just as it's got rendered.
 *
 * Progress and other stuff are synced through Zustand Store.
 */
export const Upload: FC<IUploadProps> = ({href, file}) => {
    const uuid   = useRef(v4());
    let progress = 0;

    useEffect(() => {
        const totalChunkCount = file.size % defaultChunkSize == 0 ? file.size / defaultChunkSize : Math.floor(file.size / defaultChunkSize) + 1;
        let chunkCurrent      = 0;
        let chunkLength       = defaultChunkSize;

        console.log("ChunkCount", totalChunkCount);

        for (let chunkCount = 0; chunkCount < totalChunkCount; chunkCount++) {
            // await axios.post(toHref({chunkId: uuid}), file.slice(chunkCurrent, chunkLength), {
            //     headers: {
            //         "Content-Type": "application/octet-stream",
            //     },
            //     onUploadProgress: event => setProgressSize(size => size + event.loaded),
            // });
            console.log("uploading slice", uuid.current, chunkCurrent, chunkLength);
            console.log("slice", uuid.current, file.slice(chunkCurrent, chunkLength));
            chunkCurrent = chunkLength;
            chunkLength += defaultChunkSize;
            setTimeout(() => {
                console.log("Setting progress", uuid.current, (chunkCount / totalChunkCount) * 100);
                progress = (chunkCount / totalChunkCount) * 100;
            }, 2500);
        }

        // commit here
    }, [
        uuid.current
    ]);

    return <>
        {progress}<br/>
        {uuid.current} bello! with {file.path} to {href.href}
    </>;
};
