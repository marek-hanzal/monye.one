import { Endpoint } from "@leight/next.js-server";
import { ServerContainer } from "@/monye.one/server/container";
import { type IChunkService } from "@leight/file";

const ChunkService = ServerContainer.FileContainer.ChunkService;

export default Endpoint<IChunkService.CommitProps>({
    async handler({ end, body }) {
        end(ChunkService.commit(body));
    },
});
