import {IImportHandler} from "./IImportHandler";

export type IImportHandlers = Record<string, () => IImportHandler<any>>;
