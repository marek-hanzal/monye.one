import { ServerContainer } from "@/monye.one/server/container";
import { ChunkCommitEndpoint } from "@leight/file-server";

export default ChunkCommitEndpoint(ServerContainer.FileContainer.ChunkService);
