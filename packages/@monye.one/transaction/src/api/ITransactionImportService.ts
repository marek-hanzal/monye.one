import {type IImportService} from '@leight/import';
import {type ITransactionImportSchema} from "../schema";

export interface ITransactionImportService extends IImportService<ITransactionImportSchema> {
}

export const $TransactionImportService = Symbol.for("@monye.one/transaction/TransactionImportService");
