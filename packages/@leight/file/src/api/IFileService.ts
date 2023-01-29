import {IFile} from "./IFile";

export interface IFileServiceStoreProps {
    name: string;
    file?: string;
    path: string;
    mime?: string;
    replace?: boolean;
    userId?: string;
}

export interface IFileService {
    /**
     * Returns native (physical location) path of the given fileId.
     */
    pathOf(fileId: string): string;

    store(props: IFileServiceStoreProps): Promise<IFile>;
}

export const $FileService = Symbol.for("@leight/file-server/FileService");
