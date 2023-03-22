import {type IFile} from "../sdk";

export interface IChunkService {
    chunk(chunkId: string, chunk: Promise<Buffer>): Promise<void>;

    commit(props: IChunkService.CommitProps): Promise<IFile>;
}

export namespace IChunkService {
    export interface CommitProps {
        chunkId: string;
        userId?: string;
        name: string;
        path: string;
        mime?: string;
        replace?: boolean;
    }
}

export const $ChunkService = Symbol.for("@leight/file/IChunkService");
