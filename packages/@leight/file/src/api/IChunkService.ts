import { File } from "@prisma/client";

export interface IChunkService {
    chunk(chunkId: string, chunk: Promise<Buffer>): Promise<void>;

    commit(props: IChunkService.CommitProps): Promise<File>;
}

export namespace IChunkService {
    export interface CommitProps {
        chunkId: string;
        name: string;
        path: string;
    }
}

export const $ChunkService = Symbol.for("@leight/file-server/ChunkService");
