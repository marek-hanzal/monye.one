import {
    type IContainer,
    ServiceContext
} from "@leight/container";

export interface IChunkServiceConfig {
    path: string;
}

export const $ChunkServiceConfig = Symbol.for(
    "@leight/file/IChunkServiceConfig"
);

export const withChunkServiceConfig = (container: IContainer) => new ServiceContext<IChunkServiceConfig>(container, $ChunkServiceConfig).resolve();
