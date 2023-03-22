import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {withCursor} from "@leight/query";
import {$PrismaClient} from "@leight/prisma";
import {
	type ISource,
	withUpsert
} from "@leight/source";
import {AbstractSource} from "@leight/source-server";
import {withSourceProcedure} from "@leight/trpc-server";
import {
	$TransactionSource,
	TransactionQuerySchema,
	type ITransactionSource,
	type ITransactionSourceSchema
} from "@monye.one/transaction";
import {type PrismaClient} from "@monye.one/prisma";

export class TransactionBaseSource extends AbstractSource<ITransactionSourceSchema> implements ITransactionSource {
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
                where:   query?.filter,
                orderBy: query?.sort,
            }
        }));
    }
}

export const TransactionSourceContext = (container: IContainer) => new ServiceContext<ITransactionSource>(container, $TransactionSource);
export const TransactionSourceProcedure = withSourceProcedure<ITransactionSourceSchema>({
    source: $TransactionSource,
    schema: TransactionQuerySchema,
});