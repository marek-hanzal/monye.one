/**
	Base Prisma Source contains default implementation of Source for entity Bank connected to Prisma. This could be used for further extensions,
    also default export uses this as a parent class.
 */
import {withCursor} from "@leight/query";
import {$PrismaClient} from "@leight/prisma";
import {type ISource} from "@leight/source";
import {AbstractSource} from "@leight/source-server";
import {
	$BankSource,
	type IBankWhere,
	type IBankWhereUnique,
	type IBankOrderBy,
	type IBankSourceSchema
} from "@monye.one/bank";
import {type PrismaClient} from "@monye.one/prisma";

export class BankBasePrismaSource extends AbstractSource<IBankSourceSchema> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($BankSource);
    }

    async runFind(id: string): Promise<IBankSourceSchema["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
            include: undefined,
        });
    }

    async runCreate(entity: IBankSourceSchema["Create"]): Promise<IBankSourceSchema["Entity"]> {
        return this.prisma().create({
            data: entity,
            include: undefined,
        });
    }

    async runPatch({id, ...patch}: IBankSourceSchema["Patch"]): Promise<IBankSourceSchema["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: {id},
            include: undefined,
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<IBankSourceSchema>): Promise<IBankSourceSchema["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
            include: undefined,
        });
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
                include: undefined,
            },
        }));
    }
    
    prisma() {
        return this.prismaClient.bank;
    }
    
    toWhere(filter?: IBankSourceSchema["Filter"]): IBankWhere | undefined {
        return filter;
    }
    
    toWhereUnique(filter: IBankSourceSchema["Filter"]): IBankWhereUnique {
        return filter as IBankWhereUnique;
    }
    
    toOrderBy(sort?: IBankSourceSchema["Sort"]): IBankOrderBy | undefined {
        return sort as IBankOrderBy;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_kcfn4hz4zmjffm8nvdqcdzdj = true;