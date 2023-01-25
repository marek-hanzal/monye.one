import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import {
    $FileServiceConfig,
    type IFile,
    type IFileService,
    type IFileServiceConfig,
    type IFileServiceStoreProps,
} from "@leight/file";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";
import fs from "node:fs";
import { copySync } from "fs-extra";
import touch from "touch";
import coolPath from "node:path";
import { $PrismaClient } from "@leight/prisma";
import { detectFileMime } from "mime-detect";

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

    protected async mimeOf(file?: string): Promise<string> {
        if (!file) {
            return "application/octet-stream";
        }
        try {
            return await detectFileMime(file);
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

    async store({
        name,
        path,
        file,
        userId,
        mime,
        replace = false,
    }: IFileServiceStoreProps): Promise<IFile> {
        const id = v4();
        const location = this.pathOf(id);
        fs.mkdirSync(coolPath.dirname(location), { recursive: true });
        file
            ? copySync(file, location, { overwrite: replace })
            : touch.sync(location);
        const data = {
            id,
            location,
            name,
            path,
            mime: mime || (await this.mimeOf(location)),
            size: this.sizeOf(location),
            created: new Date().toISOString(),
            ttl: undefined,
            userId,
        };

        return replace && userId
            ? this.prismaClient.file.upsert({
                  where: {
                      userId_path_name: {
                          name,
                          path,
                          userId,
                      },
                  },
                  create: data,
                  update: data,
              })
            : this.prismaClient.file.create({
                  data,
              });
    }
}
