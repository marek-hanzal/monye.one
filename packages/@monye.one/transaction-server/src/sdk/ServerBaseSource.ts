/**
	Base Source contains default implementation of Source for entity Transaction. This could be used for further extensions,
    also default export uses this as a parent class.
 */
import {withCursor} from "@leight/query";
import {$PrismaClient} from "@leight/prisma";
import {
	type ISource,
	withUpsert
} from "@leight/source";
import {AbstractSource} from "@leight/source-server";
import {
	$TransactionSource,
	type ITransactionSourceSchema
} from "@monye.one/transaction";
import {type PrismaClient} from "@monye.one/prisma";

type IEntity = ITransactionSourceSchema["Entity"];
type IQuery = ITransactionSourceSchema["Query"];

export class TransactionBaseSource extends AbstractSource<ITransactionSourceSchema> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($TransactionSource);
    }

    async runUpsert(props: ISource.IUpsert<ITransactionSourceSchema>): Promise<IEntity> {
        return this.prisma().upsert(withUpsert(props));
    }

    async runCount(query?: IQuery): Promise<number> {
        return this.prisma().count({
            where: query?.filter,
        });
    }

    async runQuery(query?: IQuery): Promise<IEntity[]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   query?.filter,
                orderBy: query?.sort,
            }
        }));
    }
    
    prisma() {
        return this.prismaClient.transaction;
    }
}