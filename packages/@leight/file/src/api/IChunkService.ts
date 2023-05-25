import {
    type IContainer,
    ServiceContext
}                             from "@leight/container";
import {type IFileSourceType} from "../sdk";

export interface IChunkService {
    chunk(chunkId: string, chunk: Promise<Buffer>): Promise<void>;

    commit(props: IChunkService.CommitProps): Promise<IFileSourceType["Entity"]>;
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

export const withChunkService = (container: IContainer) => new ServiceContext<IChunkService>(container, $ChunkService).resolve();
