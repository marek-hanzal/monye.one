import {type IImportHandler} from "./IImportHandler";

export interface IImportHandlerService {
    resolve<TItem>(service: string): IImportHandler<TItem>;
}

export const $ImportHandlerService = Symbol.for(
    "@leight/import-server/ImportHandlerService"
);
