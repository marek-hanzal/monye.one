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
	type ITransactionWhere,
	type ITransactionWhereUnique,
	type ITransactionOrderBy,
	type ITransactionSourceSchema
} from "@monye.one/transaction";
import {type PrismaClient} from "@monye.one/prisma";

export class TransactionBaseSource extends AbstractSource<ITransactionSourceSchema> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($TransactionSource);
    }

    async runUpsert(props: ISource.IUpsert<ITransactionSourceSchema>): Promise<ITransactionSourceSchema["Entity"]> {
        return this.prisma().upsert(withUpsert(props));
    }

    async runCount(query?: ITransactionSourceSchema["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: ITransactionSourceSchema["Query"]): Promise<ITransactionSourceSchema["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
            }
        }));
    }
    
    prisma() {
        return this.prismaClient.transaction;
    }
    
    toWhere(filter?: ITransactionSourceSchema["Filter"]): ITransactionWhere | undefined {
        return undefined;
    }
    
    toWhereUnique(filter?: ITransactionSourceSchema["Filter"]): ITransactionWhereUnique | undefined {
        return undefined;
    }
    
    toOrderBy(sort?: ITransactionSourceSchema["Sort"]): ITransactionOrderBy | undefined {
        return sort as ITransactionOrderBy;
    }
}