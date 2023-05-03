import {type ITransactionSourceSchemaType} from "../schema";

export interface ITransactionPairService {
    pair(transactionId: string): Promise<ITransactionSourceSchemaType["Dto"] | null>;

    withTransaction(transaction: ITransactionSourceSchemaType["Dto"]): Promise<ITransactionSourceSchemaType["Dto"] | null>;
}

export const $TransactionPairService = Symbol.for("@monye.one/transaction/ITransactionPairService");
