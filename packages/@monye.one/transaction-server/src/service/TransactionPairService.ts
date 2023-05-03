import {decimalOf} from "@leight/prisma";
import {
    $TransactionSource,
    $TransactionSourceMapper,
    type ITransactionPairService,
    type ITransactionSource,
    type ITransactionSourceMapper,
    type ITransactionSourceSchemaType
}                  from "@monye.one/transaction";

export class TransactionPairService implements ITransactionPairService {
    static inject = [
        $TransactionSource,
        $TransactionSourceMapper,
    ];

    constructor(
        protected transactionSource: ITransactionSource,
        protected transactionSourceMapper: ITransactionSourceMapper,
    ) {
    }

    async pair(transactionId: string): Promise<ITransactionSourceSchemaType["Dto"] | null> {
        return this.withTransaction(await this.transactionSourceMapper.toDto(
            await this.transactionSource.find(transactionId)
        ));
    }

    async withTransaction(transaction: ITransactionSourceSchemaType["Dto"]): Promise<ITransactionSourceSchemaType["Dto"] | null> {
        const {target} = transaction;
        const amount   = decimalOf(transaction.amount);
        if (transaction.target && !transaction.fromId && amount > 0) {
            /**
             * From
             */
            const targetAmount = amount * -1;
            const from         = await this.transactionSource.fetchOptional({
                filter: {
                    amountFrom: targetAmount,
                    amountTo:   targetAmount,
                    account:    target,
                    withoutTo:  true,
                },
            });
            if (from) {
                await this.transactionSource.patch({
                    patch:  {
                        fromId: from.id,
                    },
                    filter: {
                        id: transaction.id,
                    },
                });
                await this.transactionSource.patch({
                    patch:  {
                        toId: transaction.id,
                    },
                    filter: {
                        id: from.id,
                    },
                });
                return this.transactionSourceMapper.toDto(from);
            }
        } else if (transaction.target && !transaction.toId) {
            /**
             * To
             */
            const targetAmount = Math.abs(amount);
            const to           = await this.transactionSource.fetchOptional({
                filter: {
                    amountFrom:  targetAmount,
                    amountTo:    targetAmount,
                    account:     target,
                    withoutFrom: true,
                },
            });
            if (to) {
                await this.transactionSource.patch({
                    patch:  {
                        toId: to.id,
                    },
                    filter: {
                        id: transaction.id,
                    },
                });
                await this.transactionSource.patch({
                    patch:  {
                        fromId: transaction.id,
                    },
                    filter: {
                        id: to.id,
                    },
                });
                return this.transactionSourceMapper.toDto(to);
            }
        }
        return null;
    }
}
