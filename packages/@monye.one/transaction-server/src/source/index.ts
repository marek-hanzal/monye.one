import {$PrismaClient}     from "@leight/prisma";
import {AbstractSource}    from "@leight/source-server";
import {type PrismaClient} from "@monye.one/prisma";
import {
    $TransactionSource,
    type ITransactionSource,
    type ITransactionSourceSchema
}                          from "@monye.one/transaction";

export class TransactionSource extends AbstractSource<ITransactionSourceSchema> implements ITransactionSource {
    static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($TransactionSource);
    }
}
