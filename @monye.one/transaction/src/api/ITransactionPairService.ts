import {type TransactionSource} from "../schema";

export interface ITransactionPairService {
    pair(transactionId: string): Promise<unknown>;

    withTransaction(transaction: TransactionSource["Type"]["Dto"]): Promise<unknown>;
}

export const $TransactionPairService = Symbol.for("@monye.one/transaction/ITransactionPairService");
