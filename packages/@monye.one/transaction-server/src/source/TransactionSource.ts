import {AbstractSource} from "@leight/source-server";
import {
    $TransactionSource,
    type ITransaction,
    type ITransactionQuery,
    type ITransactionSource
} from "@monye.one/transaction";
import {inject, injectable} from "tsyringe";
import {type IPrismaClient} from "@monye.one/prisma";
import {$PrismaClient} from "@leight/prisma";

@injectable()
export class TransactionSource extends AbstractSource<ITransaction, ITransactionQuery> implements ITransactionSource {
    constructor(
        @inject($PrismaClient) protected prismaClient: IPrismaClient,
    ) {
        super($TransactionSource);
    }

    async runQuery(query?: ITransactionQuery): Promise<ITransaction[]> {
        return this.prismaClient.transaction.findMany({
            take: 10,
            skip: 0,
        });
    }
}
