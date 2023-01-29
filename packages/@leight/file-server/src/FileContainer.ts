import "reflect-metadata";
import {
    $ChunkService,
    $ChunkServiceConfig,
    $FileService,
    $FileServiceConfig,
    type IChunkService,
    type IChunkServiceConfig,
    type IFileService,
    type IFileServiceConfig,
} from "@leight/file";
import {type IContainer} from "@leight/container";
import {ChunkService, FileService} from "./service";

export interface IFileContainer {
    ChunkService: IChunkService;
    ChunkServiceConfig: IChunkServiceConfig;
    FileService: IFileService;
    FileServiceConfig: IFileServiceConfig;
}

/**
 * Register services of this package into a container and return typed
 * public services.
 */
export const FileContainer = (container: IContainer): IFileContainer => {
    container.register<IChunkService>($ChunkService, {
        useClass: ChunkService,
    });
    container.register<IChunkServiceConfig>($ChunkServiceConfig, {
        useValue: {
            path: ".data/chunk/{chunkId}",
        },
    });
    container.register<IFileService>($FileService, {
        useClass: FileService,
    });
    container.register<IFileServiceConfig>($FileServiceConfig, {
        useValue: {
            path: ".data/file/{fileId}",
            defaultMimeType: "application/octet-stream",
        },
    });

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
    };
};
