import {$ChunkService, IChunkService} from "@leight/file";
import {Endpoint} from "@leight/next.js-server";
import {container} from "tsyringe";

/**
 * Export default this to handle chunk commits.
 */
export const ChunkCommitEndpoint = (target: typeof container) => {
    return Endpoint<IChunkService.CommitProps>({
        container: target,
        async handler({ end, body }) {
            await container.resolve<IChunkService>($ChunkService).commit(body);
            end();
        },
    });
};
