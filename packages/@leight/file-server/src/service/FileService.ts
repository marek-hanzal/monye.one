import {
    $FileServiceConfig,
    $FileSource,
    type IFile,
    type IFileService,
    type IFileServiceConfig,
    type IFileServiceStoreProps,
    type IFileSource,
}                   from "@leight/file";
import {generateId} from "@leight/utils";
import {copySync}   from "fs-extra";
import fs           from "node:fs";
import coolPath     from "node:path";

export class FileService implements IFileService {
    static inject = [
        $FileServiceConfig,
        $FileSource,
    ];

    constructor(
        private fileServiceConfig: IFileServiceConfig,
        private fileSource: IFileSource,
    ) {
    }

    public pathOf(fileId: string): string {
        return this.fileServiceConfig.path.replace(
            "{fileId}",
            fileId.split("-").join("/")
        );
    }

    public fetch(fileId: string): Promise<IFile> {
        return this.fileSource.find(fileId);
    }

    public async store(
        {
            name,
            path,
            file,
            userId,
            mime,
            replace = false,
        }: IFileServiceStoreProps): Promise<IFile> {
        const id       = generateId();
        const location = this.pathOf(id);
        fs.mkdirSync(coolPath.dirname(location), {recursive: true});
        file
            ? copySync(file, location, {overwrite: replace})
            : (await import("touch")).sync(location);
        const data = {
            id,
            location,
            name,
            path,
            mime:    mime || (await this.mimeOf(location)),
            size:    this.sizeOf(location),
            created: new Date(),
            ttl:     undefined,
            userId,
        };

        return replace && userId
            ? this.fileSource.upsert({
                filter: {
                    userId_path_name: {
                        name,
                        path,
                        userId,
                    },
                },
                create: data,
                patch:  data,
            })
            : this.fileSource.create(data);
    }

    protected async mimeOf(file?: string): Promise<string> {
        if (!file) {
            return (
                this.fileServiceConfig.defaultMimeType ||
                "application/octet-stream"
            );
        }
        try {
            return await (await import("mime-detect")).detectFileMime(file);
        } catch (e) {
            return (
                this.fileServiceConfig.defaultMimeType ||
                "application/octet-stream"
            );
        }
    }

    protected sizeOf(file?: string): number {
        if (!file) {
            return 0;
        }
        return fs.statSync(file).size;
    }
}
