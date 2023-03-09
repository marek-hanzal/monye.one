import {type ISource}                  from "@leight/source";
import {type ITransactionSourceConfig} from "./ITransactionSourceConfig";

export interface ITransactionSource extends ISource<ITransactionSourceConfig> {
}

export const $TransactionSource = Symbol.for("@monye.one/transaction/TransactionSource");
