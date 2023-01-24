import "reflect-metadata";
import {$ChunkService, type IChunkService} from "@leight/file";
import {Endpoint} from "@leight/next.js-server";
import {container} from "tsyringe";

/**
 * Export default this to handle chunk commits.
 */
export const ChunkCommitEndpoint = (
    target: typeof container,
    withTokens?: string[]
) => {
    return Endpoint<IChunkService.CommitProps>({
        container: target,
        withTokens: withTokens || ["user"],
        async handler({ end, body, userService }) {
            await container.resolve<IChunkService>($ChunkService).commit({
                ...body,
                userId: userService.optional(),
            });
            end();
        },
    });
};
