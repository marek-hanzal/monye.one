export interface IChunkServiceConfig {
	path?: string;
}

export const $ChunkServiceConfig = Symbol.for("@leight/file-server/ChunkServiceConfig");
