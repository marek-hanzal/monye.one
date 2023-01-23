import { outputFileSync, removeSync } from "fs-extra";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import {
    $ChunkServiceConfig,
    $FileService,
    type IChunkService,
    type IChunkServiceConfig,
    type IFileService,
} from "@leight/file";
import { File } from "@prisma/client";

@injectable()
export class ChunkService implements IChunkService {
    constructor(
        @inject($ChunkServiceConfig)
        protected chunkServiceConfig: IChunkServiceConfig,
        @inject($FileService)
        protected fileService: IFileService
    ) {}

    protected pathOf(chunkId: string) {
        return this.chunkServiceConfig.path.replace("{chunkId}", chunkId);
    }

    public async chunk(chunkId: string, chunk: Promise<Buffer>): Promise<void> {
        outputFileSync(this.pathOf(chunkId), await chunk, { flag: "a" });
    }

    public async commit({
        chunkId,
        name,
        path,
    }: IChunkService.CommitProps): Promise<File> {
        const $file = this.pathOf(chunkId);
        const file = this.fileService.store({
            file: $file,
            path,
            name,
        });
        removeSync($file);
        return file;
    }
}
