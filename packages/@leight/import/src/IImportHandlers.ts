import { type IImportHandler } from "./IImportHandler";

export type IImportHandlers = Record<string, () => IImportHandler<unknown>>;
