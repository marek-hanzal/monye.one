/**
	Base Prisma Source contains default implementation of Source for entity Transaction connected to Prisma. This could be used for further extensions,
    also default export uses this as a parent class.
 */
import {withCursor} from "@leight/query";
import {$PrismaClient} from "@leight/prisma";
import {type ISource} from "@leight/source";
import {AbstractSource} from "@leight/source-server";
import {
	$TransactionSource,
	ITransactionSourceSchema,
	type ITransactionPrismaSchema
} from "@monye.one/transaction";
import {type PrismaClient} from "@monye.one/prisma";

export class TransactionBasePrismaSource extends AbstractSource<ITransactionSourceSchema> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($TransactionSource);
    }

    async runFind(id: string): Promise<ITransactionSourceSchema["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
            include: {"bank":true},
        });
    }

    async runCreate(entity: ITransactionSourceSchema["Create"]): Promise<ITransactionSourceSchema["Entity"]> {
        return this.prisma().create({
            data: entity,
            include: {"bank":true},
        });
    }

    async runPatch({id, ...patch}: ITransactionSourceSchema["Patch"]): Promise<ITransactionSourceSchema["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: {id},
            include: {"bank":true},
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<ITransactionSourceSchema>): Promise<ITransactionSourceSchema["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
            include: {"bank":true},
        });
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
                include: {"bank":true},
            },
        }));
    }
    
    prisma() {
        return this.prismaClient.transaction;
    }
    
    toWhere(filter?: ITransactionSourceSchema["Filter"]): ITransactionPrismaSchema['Where'] | undefined {
        return filter;
    }
    
    toWhereUnique(filter: ITransactionSourceSchema["Filter"]): ITransactionPrismaSchema['WhereUnique'] {
        return filter as ITransactionPrismaSchema['WhereUnique'];
    }
    
    toOrderBy(sort?: ITransactionSourceSchema["Sort"]): ITransactionPrismaSchema['OrderBy'] | undefined {
        return sort as ITransactionPrismaSchema['OrderBy'];
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_oash4l7l6tocxggro7k5ktp9 = true;