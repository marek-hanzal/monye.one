import {type IContainer} from "@leight/container";
import {
    $ChunkService,
    $ChunkServiceConfig,
    $FileService,
    $FileServiceConfig,
    $FileSource,
    $FileSourceMapper,
    $FileSourceService,
    type IChunkService,
    type IChunkServiceConfig,
    type IFileService,
    type IFileServiceConfig,
    type IFileSource,
    type IFileSourceMapper
}                        from "@leight/file";
import {
    FileBaseSourceMapper,
    FileBaseSourceService,
    type IFileSourceService
}                        from "./sdk";
import {
    ChunkService,
    FileService
}                        from "./service";
import {FileSource}      from "./source";

export interface IFileContainer {
    ChunkService: IChunkService;
    ChunkServiceConfig: IChunkServiceConfig;
    FileService: IFileService;
    FileServiceConfig: IFileServiceConfig;
    FileSource: IFileSource;
    FileSourceService: IFileSourceService;
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
        .bindClass($FileSourceService, FileBaseSourceService)
        .bindClass($FileSourceMapper, FileBaseSourceMapper);

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
        get FileSourceService() {
            return container.resolve<IFileSourceService>($FileSourceService);
        },
        get FileSourceMapper() {
            return container.resolve<IFileSourceMapper>($FileSourceMapper);
        },
    };
};
