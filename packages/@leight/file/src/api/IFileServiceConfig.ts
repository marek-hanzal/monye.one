export interface IFileServiceConfig {
    path: string;
    defaultMimeType?: string;
}

export const $FileServiceConfig = Symbol.for(
    "@leight/file/IFileServiceConfig"
);
