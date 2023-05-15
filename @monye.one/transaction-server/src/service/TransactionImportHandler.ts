import {type IImportHandler} from "@leight/import";
import {$UserService, type IUserService} from "@leight/user";
import {z} from "@leight/zod";
import {$BankRepository, type IBankRepository} from "@monye.one/bank";
import {$TransactionRepository, type ITransactionImport, type ITransactionImportHandler, type ITransactionImportParams, ITransactionRepository, TransactionImportSchema} from "@monye.one/transaction";

export class TransactionImportHandler implements ITransactionImportHandler {
    static inject = [
        $BankRepository,
        $TransactionRepository,
        $UserService,
    ];

    constructor(
        protected bankRepository: IBankRepository,
        protected transactionRepository: ITransactionRepository,
        protected userService: IUserService,
    ) {
    }

    async handler({item, params}: IImportHandler.IHandlerProps<ITransactionImport, ITransactionImportParams>): Promise<any> {
        const {bank: account, ...transaction} = item;
        const $account = params.account || account;
        if (!$account) {
            console.error("Missing bank account in import or import params.");
            return;
        }
        const bank = await this.bankRepository.upsert({
            filter: {
                userId_account: {
                    userId: this.userService.required(),
                    account: $account,
                },
            },
            create: {
                userId: this.userService.required(),
                account: $account,
            },
            patch: {
                userId: this.userService.required(),
                account: $account,
            },
        });

        return this.transactionRepository.upsert({
            filter: {
                userId_reference: {
                    userId: this.userService.required(),
                    reference: transaction.reference,
                },
            },
            create: {
                ...transaction,
                userId: this.userService.required(),
                bankId: bank.id,
            },
            patch: {
                ...transaction,
                bankId: bank.id,
            },
        });
    }

    validator(): z.ZodType {
        return TransactionImportSchema;
    }
}
