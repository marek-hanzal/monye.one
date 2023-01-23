import { Endpoint } from "@leight/next.js-server";
import { ServerContainer } from "@/monye.one/server/container";

export const config = {
    api: {
        bodyParser: false,
    },
};

const ChunkService = ServerContainer.FileContainer.ChunkService;

export default Endpoint<unknown, void, { chunkId: string }>({
    async handler({ toBody, query: { chunkId }, end }) {
        end(await ChunkService.chunk(chunkId, toBody()));
    },
});
