import { File } from "@prisma/client";

export interface IFileServiceStoreProps {
    name: string;
    file?: string;
    path: string;
    replace?: boolean;
    userId?: string;
}

export interface IFileService {
    store(props: IFileServiceStoreProps): Promise<File>;
}

export const $FileService = Symbol.for("@leight/file-server/FileService");
