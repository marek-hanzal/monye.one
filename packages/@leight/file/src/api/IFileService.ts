import {
    type IContainer,
    ServiceContext
}                             from "@leight/container";
import {type IFileSourceType} from "../sdk";

export interface IFileService {
    /**
     * Returns native (physical location) path of the given fileId.
     */
    pathOf(fileId: string): string;

    fetch(fileId: string): Promise<IFileSourceType["Dto"]>;

    store(props: IFileService.StoreProps): Promise<IFileSourceType["Dto"]>;
}

export namespace IFileService {
    export interface StoreProps {
        name: string;
        file?: string;
        path: string;
        mime?: string;
        replace?: boolean;
        userId?: string;
    }
}

export const $FileService = Symbol.for("@leight/file/IFileService");

export const withFileService = (container: IContainer) => new ServiceContext<IFileService>(container, $FileService).resolve();
