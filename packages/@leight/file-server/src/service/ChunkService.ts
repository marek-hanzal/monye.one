import {$ChunkServiceConfig, $FileService, type FileSource, type IChunkService, type IChunkServiceConfig, type IFileService} from "@leight/file";
import {outputFileSync, removeSync} from "fs-extra";

export class ChunkService implements IChunkService {
    static inject = [
        $ChunkServiceConfig,
        $FileService,
    ];

    constructor(
        protected chunkServiceConfig: IChunkServiceConfig,
        protected fileService: IFileService
    ) {
    }

    public async chunk(chunkId: string, chunk: Promise<Buffer>): Promise<void> {
        outputFileSync(this.pathOf(chunkId), await chunk, {flag: "a"});
    }

    public async commit(
        {
            chunkId,
            name,
            path,
            mime,
            userId,
            replace,
        }: IChunkService.CommitProps): Promise<FileSource["Type"]["Dto"]> {
        const $file = this.pathOf(chunkId);
        const file = await this.fileService.store({
            file: $file,
            path,
            name,
            mime,
            userId,
            replace,
        });
        removeSync($file);
        return file;
    }

    protected pathOf(chunkId: string) {
        return this.chunkServiceConfig.path.replace("{chunkId}", chunkId);
    }
}
