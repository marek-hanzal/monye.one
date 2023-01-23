import {IChunkService} from "@leight/file";
import {Endpoint} from "@leight/next.js-server";

/**
 * Export default this to handle chunk commits.
 */
export const ChunkCommitEndpoint = (chunkService: IChunkService) => {
    return Endpoint<IChunkService.CommitProps>({
        async handler({ end, body }) {
            await chunkService.commit(body);
            end();
        },
    });
};
