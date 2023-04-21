import {type IImportHandler} from "@leight/import";
import {
    $UserService,
    type IUserService
}                            from "@leight/user";
import {z}                   from "@leight/zod";
import {
    $BankSource,
    type IBankSource
}                            from "@monye.one/bank";
import {
    $TransactionSource,
    type ITransactionImport,
    type ITransactionImportHandler,
    type ITransactionImportParams,
    type ITransactionSource,
    TransactionImportSchema
}                            from "@monye.one/transaction";

export class TransactionImportHandler implements ITransactionImportHandler {
    static inject = [
        $BankSource,
        $TransactionSource,
        $UserService,
    ];

    constructor(
        protected bankSource: IBankSource,
        protected transactionSource: ITransactionSource,
        protected userService: IUserService,
    ) {
    }

    async handler({item, params}: IImportHandler.IHandlerProps<ITransactionImport, ITransactionImportParams>): Promise<any> {
        const {bank: account, ...transaction} = item;
        const $account                        = params.account || account;
        if (!$account) {
            console.error("Missing bank account in import or import params.");
            return;
        }
        const bank = await this.bankSource.upsert({
            filter: {
                userId_account: {
                    userId:  this.userService.required(),
                    account: $account,
                },
            },
            create: {
                userId:  this.userService.required(),
                account: $account,
            },
            patch:  {
                userId:  this.userService.required(),
                account: $account,
            },
        });

        return this.transactionSource.upsert({
            filter: {
                userId_reference: {
                    userId:    this.userService.required(),
                    reference: transaction.reference,
                },
            },
            create: {
                ...transaction,
                userId: this.userService.required(),
                bankId: bank.id,
            },
            patch:  {
                ...transaction,
                bankId: bank.id,
            },
        });
    }

    validator(): z.ZodType {
        return TransactionImportSchema;
    }
}
