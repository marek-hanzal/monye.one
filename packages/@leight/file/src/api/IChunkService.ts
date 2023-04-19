import {type IFileSourceSchema} from "../sdk";

export interface IChunkService {
    chunk(chunkId: string, chunk: Promise<Buffer>): Promise<void>;

    commit(props: IChunkService.CommitProps): Promise<IFileSourceSchema["Entity"]>;
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
