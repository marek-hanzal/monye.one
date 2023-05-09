import {type FileSource} from "../schema";

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

    fetch(fileId: string): Promise<FileSource["Type"]["Dto"]>;

    store(props: IFileServiceStoreProps): Promise<FileSource["Type"]["Dto"]>;
}

export const $FileService = Symbol.for("@leight/file/IFileService");
