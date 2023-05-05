import {type IContainer}             from "@leight/container";
import {
    $ChunkService,
    $ChunkServiceConfig,
    $FileRepository,
    $FileService,
    $FileServiceConfig
}                                    from "@leight/file";
import {withFileRepositoryContainer} from "./sdk";
import {
    ChunkService,
    FileService
}                                    from "./service";
import {FileSource}                  from "./source";

/**
 * Register services of this package into a container and return typed
 * public services.
 */
export const FileContainer = (container: IContainer) => {
    withFileRepositoryContainer(container);
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
        .bindClass($FileRepository, FileSource);
};
