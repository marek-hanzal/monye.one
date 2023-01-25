import "reflect-metadata";
import {$ChunkService, type IChunkService, type IFile} from "@leight/file";
import {Endpoint, type IEndpointFactory} from "@leight/next.js-server";
import {container} from "tsyringe";

/**
 * Export default this to handle chunk commits.
 */
export const ChunkCommitEndpoint: IEndpointFactory<IFile> = (
    target,
    withTokens
) => {
    return Endpoint<IChunkService.CommitProps, IFile>({
        container: target,
        withTokens: withTokens || ["user"],
        async handler({ body, userService }) {
            return await container
                .resolve<IChunkService>($ChunkService)
                .commit({
                    ...body,
                    userId: userService.optional(),
                });
        },
    });
};
