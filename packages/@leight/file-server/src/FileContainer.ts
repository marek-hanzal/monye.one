import {type IContainer} from "@leight/container";
import {
    $ChunkService,
    $ChunkServiceConfig,
    $FileService,
    $FileServiceConfig,
    $FileSource,
    $FileSourceMapper,
    type IChunkService,
    type IChunkServiceConfig,
    type IFileService,
    type IFileServiceConfig,
    type IFileSource,
}                        from "@leight/file";
import {
    FileSource,
    FileSourceMapper,
    IFileSourceMapper
}                        from "./sdk";

import {
    ChunkService,
    FileService
} from "./service";

export interface IFileContainer {
    ChunkService: IChunkService;
    ChunkServiceConfig: IChunkServiceConfig;
    FileService: IFileService;
    FileServiceConfig: IFileServiceConfig;
    FileSource: IFileSource;
    FileSourceMapper: IFileSourceMapper;
}

/**
 * Register services of this package into a container and return typed
 * public services.
 */
export const FileContainer = (container: IContainer): IFileContainer => {
    container
        .bindClass($ChunkService, ChunkService)
        .bindValue($ChunkServiceConfig, {
            path: ".data/chunk/{chunkId}",
        })
        .bindClass($FileService, FileService)
        .bindValue($FileServiceConfig, {
            path:            ".data/file/{fileId}",
            defaultMimeType: "application/octet-stream",
        })
        .bindClass($FileSource, FileSource)
        .bindClass($FileSourceMapper, FileSourceMapper);

    return {
        get ChunkService() {
            return container.resolve<IChunkService>($ChunkService);
        },
        get ChunkServiceConfig() {
            return container.resolve<IChunkServiceConfig>($ChunkServiceConfig);
        },
        get FileService() {
            return container.resolve<IFileService>($FileService);
        },
        get FileServiceConfig() {
            return container.resolve<IFileServiceConfig>($FileServiceConfig);
        },
        get FileSource() {
            return container.resolve<IFileSource>($FileSource);
        },
        get FileSourceMapper() {
            return container.resolve<IFileSourceMapper>($FileSourceMapper);
        },
    };
};
