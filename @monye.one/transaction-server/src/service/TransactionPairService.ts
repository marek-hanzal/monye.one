import {$BankRepository, type IBankRepository} from "@monye.one/bank";
import {$TransactionRepository, $TransactionRepositoryMapper, type ITransactionPairService, type ITransactionRepository, type ITransactionRepositoryMapper, TransactionSource} from "@monye.one/transaction";

export class TransactionPairService implements ITransactionPairService {
    static inject = [
        $TransactionRepository,
        $TransactionRepositoryMapper,
        $BankRepository,
    ];

    constructor(
        protected transactionRepository: ITransactionRepository,
        protected transactionRepositoryMapper: ITransactionRepositoryMapper,
        protected bankRepository: IBankRepository,
    ) {
    }

    async pair(transactionId: string): Promise<unknown> {
        return this.withTransaction(await this.transactionRepositoryMapper.toDto(
            await this.transactionRepository.get(transactionId)
        ));
    }

    async withTransaction(transaction: TransactionSource["Type"]["Dto"]): Promise<unknown> {
        const {target} = transaction;
        if (!target) {
            return;
        }
        const count = await this.bankRepository.count({
            account: target,
        });
        if (count > 0) {
            await this.transactionRepository.patch({
                patch: {
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
