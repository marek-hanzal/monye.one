import {$PrismaClient}     from "@leight/prisma";
import {withCursor}        from "@leight/query";
import {
    type ISource,
    withUpsert
}                          from "@leight/source";
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

    async runUpsert(props: ISource.IUpsert<ITransactionSourceSchema>): Promise<ITransactionSourceSchema["Entity"]> {
        return this.prismaClient.transaction.upsert(withUpsert(props));
    }

    async runCount(query?: ITransactionSourceSchema["Query"]): Promise<number> {
        return this.prismaClient.transaction.count({
            where: query?.filter,
        });
    }

    async runQuery(query?: ITransactionSourceSchema["Query"]): Promise<ITransactionSourceSchema["Entity"][]> {
        return this.prismaClient.transaction.findMany(withCursor({
            query,
            arg: {
                where: query?.filter,
            }
        }));
    }
}
