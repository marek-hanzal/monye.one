import {type IFileSourceSchemaType} from "../schema";

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

    fetch(fileId: string): Promise<IFileSourceSchemaType["Entity"]>;

    store(props: IFileServiceStoreProps): Promise<IFileSourceSchemaType["Entity"]>;
}

export const $FileService = Symbol.for("@leight/file/IFileService");
