import {
    $ChunkService,
    type IChunkService
}                              from "@leight/file";
import {type IEndpointFactory} from "@leight/server";
import {Endpoint}              from "@leight/server-server";

/**
 * Export default this to handle chunk uploading.
 */
export const ChunkUploadEndpoint: IEndpointFactory<void> = (
    container,
    withTokens
) => {
    return Endpoint<unknown, void, {
        chunkId: string
    }>({
        container,
        withTokens: withTokens || ["user"],
        async handler(
            {
                toBody,
                query: {chunkId},
                end
            }) {
            await container
                .resolve<IChunkService>($ChunkService)
                .chunk(chunkId, toBody());
            end();
        },
    });
};
