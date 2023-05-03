import {type ITransactionSourceSchemaType} from "../schema";

export interface ITransactionPairService {
    pair(transactionId: string): Promise<unknown>;

    withTransaction(transaction: ITransactionSourceSchemaType["Dto"]): Promise<unknown>;
}

export const $TransactionPairService = Symbol.for("@monye.one/transaction/ITransactionPairService");
