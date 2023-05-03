import {
    $BankSource,
    IBankSource
} from "@monye.one/bank";
import {
    $TransactionSource,
    $TransactionSourceMapper,
    type ITransactionPairService,
    type ITransactionSource,
    type ITransactionSourceMapper,
    type ITransactionSourceSchemaType
} from "@monye.one/transaction";

export class TransactionPairService implements ITransactionPairService {
    static inject = [
        $TransactionSource,
        $TransactionSourceMapper,
        $BankSource,
    ];

    constructor(
        protected transactionSource: ITransactionSource,
        protected transactionSourceMapper: ITransactionSourceMapper,
        protected bankSource: IBankSource,
    ) {
    }

    async pair(transactionId: string): Promise<unknown> {
        return this.withTransaction(await this.transactionSourceMapper.toDto(
            await this.transactionSource.find(transactionId)
        ));
    }

    async withTransaction(transaction: ITransactionSourceSchemaType["Dto"]): Promise<unknown> {
        const {target} = transaction;
        if (!target) {
            return;
        }
        const count = await this.bankSource.count({
            filter: {
                account: target,
            }
        });
        if (count > 0) {
            await this.transactionSource.patch({
                patch:  {
                    isTransfer: true,
                },
                filter: {
                    id: transaction.id,
                },
            });
        }
        return;
    }
}
