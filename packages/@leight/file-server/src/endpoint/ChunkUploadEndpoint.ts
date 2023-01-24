import "reflect-metadata";
import {$ChunkService, type IChunkService} from "@leight/file";
import {Endpoint} from "@leight/next.js-server";
import {container} from "tsyringe";

/**
 * Export default this to handle chunk uploading.
 */
export const ChunkUploadEndpoint = (
    target: typeof container,
    withTokens?: string[]
) => {
    return Endpoint<unknown, void, { chunkId: string }>({
        container: target,
        withTokens: withTokens || ["user"],
        async handler({ toBody, query: { chunkId }, end }) {
            await container
                .resolve<IChunkService>($ChunkService)
                .chunk(chunkId, toBody());
            end();
        },
    });
};
