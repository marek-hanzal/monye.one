import "reflect-metadata";
import { File, PrismaClient } from "@prisma/client";
import {
    $FileServiceConfig,
    type IFileService,
    type IFileServiceConfig,
    type IFileServiceStoreProps,
} from "@leight/file";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";
import fs from "node:fs";
import { copySync } from "fs-extra";
import touch from "touch";
import mime from "mime-types";
import coolPath from "node:path";
import { $PrismaClient } from "@leight/prisma";

@injectable()
export class FileService implements IFileService {
    constructor(
        @inject($FileServiceConfig)
        private fileServiceConfig: IFileServiceConfig,
        @inject($PrismaClient)
        private prismaClient: PrismaClient
    ) {}

    protected pathOf(fileId: string) {
        return this.fileServiceConfig.path.replace(
            "{fileId}",
            fileId.split("-").join("/")
        );
    }

    protected mimeOf(file?: string): string {
        if (!file) {
            return "application/octet-stream";
        }
        return (
            mime.lookup(file) ||
            this.fileServiceConfig.defaultMimeType ||
            "application/octet-stream"
        );
    }

    protected sizeOf(file?: string): number {
        if (!file) {
            return 0;
        }
        return fs.statSync(file).size;
    }

    async store({
        name,
        path,
        file,
        userId,
        replace = false,
    }: IFileServiceStoreProps): Promise<File> {
        const id = v4();
        const location = this.pathOf(id);
        fs.mkdirSync(coolPath.dirname(location), { recursive: true });
        file
            ? copySync(file, location, { overwrite: replace })
            : touch.sync(location);
        return this.prismaClient.file.create({
            data: {
                id,
                location,
                name,
                path,
                mime: this.mimeOf(file),
                size: this.sizeOf(file),
                created: new Date().toISOString(),
                ttl: undefined,
                userId,
            },
        });
    }
}
