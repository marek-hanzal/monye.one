import {$ChunkService, type FileSource, type IChunkService} from "@leight/file";
import {type IEndpointFactory} from "@leight/next.js";
import {Endpoint} from "@leight/next.js-server";

/**
 * Export default this to handle chunk commits.
 */
export const ChunkCommitEndpoint: IEndpointFactory<FileSource["Type"]["Dto"]> = (
    container,
    withTokens
) => {
    return Endpoint<IChunkService.CommitProps, FileSource["Type"]["Dto"]>({
        container,
        withTokens: withTokens || ["user"],
        async handler({body, userService}) {
            return container.resolve<IChunkService>($ChunkService).commit({
                ...body,
                userId: userService.optional(),
            });
        },
    });
};
