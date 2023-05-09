import {type IKeywordService} from "@leight/keyword";
import {type TransactionSource} from "../schema";

export interface ITransactionKeywordService extends IKeywordService<TransactionSource["Type"]["Entity"]> {
}

export const $TransactionKeywordService = Symbol.for("@monye.one/transaction/ITransactionKeywordService");
