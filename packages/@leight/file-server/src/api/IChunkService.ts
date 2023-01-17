export interface IChunkService {
	chunk(chunkId: string, chunk: Promise<Buffer>): Promise<void>;
}

export const $ChunkService = Symbol.for("@leight/file-server/ChunkService");
