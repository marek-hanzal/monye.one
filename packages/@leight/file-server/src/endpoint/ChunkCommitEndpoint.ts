import {
    $ChunkService,
    type IChunkService,
    type IFileSourceSchemaType
}                              from "@leight/file";
import {type IEndpointFactory} from "@leight/next.js";
import {Endpoint}              from "@leight/next.js-server";

/**
 * Export default this to handle chunk commits.
 */
export const ChunkCommitEndpoint: IEndpointFactory<IFileSourceSchemaType["Entity"]> = (
    container,
    withTokens
) => {
    return Endpoint<IChunkService.CommitProps, IFileSourceSchemaType["Entity"]>({
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
