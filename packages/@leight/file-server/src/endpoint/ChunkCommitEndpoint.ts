import {
    $ChunkService,
    type IChunkService,
    type IFileSourceType
}                              from "@leight/file";
import {type IEndpointFactory} from "@leight/server";
import {Endpoint}              from "@leight/server-server";

/**
 * Export default this to handle chunk commits.
 */
export const ChunkCommitEndpoint: IEndpointFactory<IFileSourceType["Dto"]> = (
    container,
    withTokens
) => {
    return Endpoint<IChunkService.CommitProps, IFileSourceType["Dto"]>({
        container,
        withTokens: withTokens || ["user"],
        async handler(
            {
                body,
                userService
            }) {
            return container.resolve<IChunkService>($ChunkService).commit({
                ...body,
                userId: userService.optional(),
            });
        },
    });
};
