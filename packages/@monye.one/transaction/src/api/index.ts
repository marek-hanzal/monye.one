import {type IImportService}     from "@leight/import";
import {type ITransactionImport} from "../schema";

export interface ITransactionImportService extends IImportService<ITransactionImport> {
}

export const $TransactionImportService = Symbol.for(
    "@monye.one/transaction/ITransactionImportService"
);
