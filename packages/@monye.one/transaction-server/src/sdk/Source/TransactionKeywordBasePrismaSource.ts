/**
	Base Prisma Source contains default implementation of Source for entity TransactionKeyword connected to Prisma. This could be used for further extensions,
    also default export uses this as a parent class.
 */
import {withCursor} from "@leight/query";
import {$PrismaClient} from "@leight/prisma";
import {
	type ISource,
	type IWithIdentity,
	SourceError
} from "@leight/source";
import {AbstractSourceEx} from "@leight/source-server";
import {
	$TransactionKeywordSource,
	type ITransactionKeywordSourceSchemaType,
	type ITransactionKeywordPrismaSchemaType
} from "@monye.one/transaction";
import {type PrismaClient} from "@monye.one/prisma";

export class TransactionKeywordBasePrismaSource extends AbstractSourceEx<ITransactionKeywordPrismaSchemaType, ITransactionKeywordSourceSchemaType> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($TransactionKeywordSource);
    }

    async runFind(id: string): Promise<ITransactionKeywordSourceSchemaType["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
        });
    }

    async runCreate(entity: ITransactionKeywordSourceSchemaType["Create"]): Promise<ITransactionKeywordSourceSchemaType["Entity"]> {
        return this.prisma().create({
            data: entity,
        });
    }

    async runPatch({id, ...patch}: ITransactionKeywordSourceSchemaType["Patch"]): Promise<ITransactionKeywordSourceSchemaType["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: {id},
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<ITransactionKeywordSourceSchemaType>): Promise<ITransactionKeywordSourceSchemaType["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
        });
    }

    async runDelete({id}: IWithIdentity): Promise<ITransactionKeywordSourceSchemaType["Entity"]> {
        const item = await this.find(id);
        const where = this.toWhereUnique({id});
        if(!where) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        }
        await this.prisma().delete({
            where,
        });
        return item;
    }
    
    async runDeleteWith(query: ITransactionKeywordSourceSchemaType["Query"]): Promise<ITransactionKeywordSourceSchemaType["Entity"][]> {
        const items = await this.query(query);
        const where = this.toWhereUnique(query.filter);
        if(!where) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        } 
        await this.prisma().delete({
            where,
        });
        return items;
    }

    async runCount(query?: ITransactionKeywordSourceSchemaType["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: ITransactionKeywordSourceSchemaType["Query"]): Promise<ITransactionKeywordSourceSchemaType["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
            },
        }));
    }
    
    prisma() {
        return this.prismaClient.transactionKeyword;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_k8pfsjihbydp5z28jba2lppn = true;