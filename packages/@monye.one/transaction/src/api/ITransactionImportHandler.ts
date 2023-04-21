import {type IImportHandler} from "@leight/import";
import {
    type ITransactionImport,
    type ITransactionImportParams
}                            from "../schema";

export interface ITransactionImportHandler extends IImportHandler<ITransactionImport, ITransactionImportParams> {
}

export const $TransactionImportHandler = Symbol.for(
    "@monye.one/transaction/ITransactionImportHandler"
);
