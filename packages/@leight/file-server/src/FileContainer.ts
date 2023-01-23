import { container } from "tsyringe";
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
import { ChunkService } from "./service";
import { FileService } from "./service/FileService";

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
export const FileContainer = (target: typeof container): IFileContainer => {
    target.register<IChunkService>($ChunkService, {
        useClass: ChunkService,
    });
    target.register<IChunkServiceConfig>($ChunkServiceConfig, {
        useValue: {
            path: ".data/chunk/{chunkId}",
        },
    });
    target.register<IFileService>($FileService, {
        useClass: FileService,
    });
    target.register<IFileServiceConfig>($FileServiceConfig, {
        useValue: {
            path: ".data/file/{fileId}",
            defaultMimeType: "application/octet-stream",
        },
    });

    return {
        get ChunkService() {
            return target.resolve<IChunkService>($ChunkService);
        },
        get ChunkServiceConfig() {
            return target.resolve<IChunkServiceConfig>($ChunkServiceConfig);
        },
        get FileService() {
            return target.resolve<IFileService>($FileService);
        },
        get FileServiceConfig() {
            return target.resolve<IFileServiceConfig>($FileServiceConfig);
        },
    };
};
