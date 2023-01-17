import {container}    from "tsyringe";
import {
	$ChunkService,
	$ChunkServiceConfig,
	type IChunkService,
	type IChunkServiceConfig
}                     from "./api";
import {ChunkService} from "./service";

/**
 * Register services of this package into a container and return typed
 * public services.
 */
export const FileContainer = (target: typeof container) => {
	target.register<IChunkService>($ChunkService, {
		useClass: ChunkService,
	});
	target.register<IChunkServiceConfig>($ChunkServiceConfig, {
		useValue: {},
	});

	return {
		get ChunkService() {
			return target.resolve<IChunkService>($ChunkService);
		},
		get ChunkServiceConfig() {
			return target.resolve<IChunkServiceConfig>($ChunkServiceConfig);
		}
	};
};
