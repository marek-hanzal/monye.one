import {type IKeywordService}              from "@leight/keyword";
import {type ITransactionSourceSchemaType} from "../schema";

export interface ITransactionKeywordService extends IKeywordService<ITransactionSourceSchemaType["Entity"]> {
}

export const $TransactionKeywordService = Symbol.for("@monye.one/transaction/ITransactionKeywordService");
