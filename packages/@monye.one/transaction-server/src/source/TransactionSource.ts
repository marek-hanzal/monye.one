import {AbstractSource} from "@leight/source-server";
import {
    $TransactionSource,
    type ITransaction,
    type ITransactionQuery,
    type ITransactionSource
} from "@monye.one/transaction";
import {injectable} from "tsyringe";

@injectable()
export class TransactionSource extends AbstractSource<ITransaction, ITransactionQuery> implements ITransactionSource {
    constructor() {
        super($TransactionSource);
    }
}
