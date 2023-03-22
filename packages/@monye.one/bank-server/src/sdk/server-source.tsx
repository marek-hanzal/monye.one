// Generated file
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
	$BankSource,
	BankQuerySchema,
	type IBankSource,
	type IBankSourceSchema
} from "@monye.one/bank";
import {type PrismaClient} from "@monye.one/prisma";

export class BankBaseSource extends AbstractSource<IBankSourceSchema> implements IBankSource {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($BankSource);
    }

    async runUpsert(props: ISource.IUpsert<IBankSourceSchema>): Promise<IBankSourceSchema["Entity"]> {
        return this.prismaClient.bank.upsert(withUpsert(props));
    }

    async runCount(query?: IBankSourceSchema["Query"]): Promise<number> {
        return this.prismaClient.bank.count({
            where: query?.filter,
        });
    }

    async runQuery(query?: IBankSourceSchema["Query"]): Promise<IBankSourceSchema["Entity"][]> {
        return this.prismaClient.bank.findMany(withCursor({
            query,
            arg: {
                where:   query?.filter,
                orderBy: query?.sort,
            }
        }));
    }
}

export const BankSourceContext = (container: IContainer) => new ServiceContext<IBankSource>(container, $BankSource);
export const BankSourceProcedure = withSourceProcedure<IBankSourceSchema>({
    source: $BankSource,
    schema: BankQuerySchema,
});