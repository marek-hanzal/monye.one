/**
	Base Source contains default implementation of Source for entity Bank. This could be used for further extensions,
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
	$BankSource,
	type IBankWhere,
	type IBankWhereUnique,
	type IBankOrderBy,
	type IBankSourceSchema
} from "@monye.one/bank";
import {type PrismaClient} from "@monye.one/prisma";

export class BankBaseSource extends AbstractSource<IBankSourceSchema> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($BankSource);
    }

    async runUpsert(props: ISource.IUpsert<IBankSourceSchema>): Promise<IBankSourceSchema["Entity"]> {
        return this.prisma().upsert(withUpsert(props));
    }

    async runCount(query?: IBankSourceSchema["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: IBankSourceSchema["Query"]): Promise<IBankSourceSchema["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
            }
        }));
    }
    
    prisma() {
        return this.prismaClient.bank;
    }
    
    toWhere(filter?: IBankSourceSchema["Filter"]): IBankWhere | undefined {
        return undefined;
    }
    
    toWhereUnique(filter?: IBankSourceSchema["Filter"]): IBankWhereUnique | undefined {
        return undefined;
    }
    
    toOrderBy(sort?: IBankSourceSchema["Sort"]): IBankOrderBy | undefined {
        return sort as IBankOrderBy;
    }
}