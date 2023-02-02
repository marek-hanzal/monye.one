import {type ISource} from "@leight/source";
import {type ITransaction} from "./ITransaction";
import {type ITransactionQuery} from "./ITransactionQuery";

export interface ITransactionSource extends ISource<ITransaction, ITransactionQuery> {
}

export const $TransactionSource = Symbol.for("@monye.one/transaction/TransactionSource");
