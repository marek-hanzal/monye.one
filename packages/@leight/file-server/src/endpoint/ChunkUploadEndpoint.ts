import {IChunkService} from "@leight/file";
import {Endpoint} from "@leight/next.js-server";

/**
 * Export default this to handle chunk uploading.
 */
export const ChunkUploadEndpoint = (chunkService: IChunkService) => {
    return Endpoint<unknown, void, { chunkId: string }>({
        async handler({ toBody, query: { chunkId }, end }) {
            await chunkService.chunk(chunkId, toBody());
            end();
        },
    });
};
