import {outputFileSync} from "fs-extra";
import "reflect-metadata";
import {
	inject,
	injectable
}                       from "tsyringe";
import {
	$ChunkServiceConfig,
	type IChunkService,
	type IChunkServiceConfig
}                       from "../api";

@injectable()
export class ChunkService implements IChunkService {
	constructor(
		@inject($ChunkServiceConfig) protected chunkServiceConfig: IChunkServiceConfig,
		protected path = chunkServiceConfig.path || ".data/chunk/{chunkId}",
	) {
	}

	protected pathOf(chunkId: string) {
		return this.path.replace("{chunkId}", chunkId);
	}

	public async chunk(chunkId: string, chunk: Promise<Buffer>): Promise<void> {
		outputFileSync(this.pathOf(chunkId), await chunk, {flag: "a"});
	}
}
