import {type IImportService} from "@leight/import";
import {
    type ITransactionImport,
    type ITransactionImportParams
}                            from "../schema";

export interface ITransactionImportService extends IImportService<ITransactionImport, ITransactionImportParams> {
}

export const $TransactionImportService = Symbol.for(
    "@monye.one/transaction/ITransactionImportService"
);
