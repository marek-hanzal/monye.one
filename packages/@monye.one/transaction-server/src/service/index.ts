import {
    $UserService,
    type IUserService
}               from "@leight/user";
import {
    $BankSource,
    type IBankSource
}               from "@monye.one/bank";
import {
    $TransactionSource,
    type ITransactionImport,
    type ITransactionImportService,
    type ITransactionSource,
    TransactionImportSchema
}               from "@monye.one/transaction";
import {type z} from "zod";

export class TransactionImportService implements ITransactionImportService {
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

    async handler(item: ITransactionImport): Promise<any> {
        const {bank: account, ...transaction} = item;
        const bank                            = await this.bankSource.upsert({
            filter: {
                userId_account: {
                    userId: this.userService.required(),
                    account,
                },
            },
            create: {
                userId: this.userService.required(),
                account,
            },
            patch:  {
                userId: this.userService.required(),
                account,
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

    validator(): z.ZodSchema {
        return TransactionImportSchema;
    }
}
