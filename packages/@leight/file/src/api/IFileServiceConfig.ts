import {
    type IContainer,
    ServiceContext
} from "@leight/container";

export interface IFileServiceConfig {
    path: string;
    defaultMimeType?: string;
}

export const $FileServiceConfig = Symbol.for(
    "@leight/file/IFileServiceConfig"
);

export const withFileServiceConfig = (container: IContainer) => new ServiceContext<IFileServiceConfig>(container, $FileServiceConfig).resolve();
