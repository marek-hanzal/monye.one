import {type IImportHandler} from "./IImportHandler";

export interface IImportHandlerService {
    resolve<TItem, TParams>(service: string): IImportHandler<TItem, TParams>;
}

export const $ImportHandlerService = Symbol.for(
    "@leight/import-server/ImportHandlerService"
);
