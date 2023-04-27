/**
	Base Prisma Source contains default implementation of Source for entity Bank connected to Prisma. This could be used for further extensions,
    also default export uses this as a parent class.
 */
import {$PrismaClient} from "@leight/prisma";
import {
	withCursor,
	type ISource,
	type IWithIdentity,
	SourceError
} from "@leight/source";
import {AbstractSourceEx} from "@leight/source-server";
import {
	$BankSource,
	type IBankSourceSchemaType,
	type IBankPrismaSchemaType
} from "@monye.one/bank";
import {type PrismaClient} from "@monye.one/prisma";

export class BankBasePrismaSource extends AbstractSourceEx<IBankPrismaSchemaType, IBankSourceSchemaType> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($BankSource);
    }

    async runFind(id: string): Promise<IBankSourceSchemaType["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
        });
    }

    async runCreate(entity: IBankSourceSchemaType["Create"]): Promise<IBankSourceSchemaType["Entity"]> {
        return this.prisma().create({
            data: entity,
        });
    }

    async runPatch({id, ...patch}: IBankSourceSchemaType["Patch"]): Promise<IBankSourceSchemaType["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: {id},
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<IBankSourceSchemaType>): Promise<IBankSourceSchemaType["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
        });
    }

    async runDelete({id}: IWithIdentity): Promise<IBankSourceSchemaType["Entity"]> {
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
    
    async runDeleteWith(query: IBankSourceSchemaType["Query"]): Promise<IBankSourceSchemaType["Entity"][]> {
        const items = await this.query(query);
        const where = this.toWhere(query.filter);
        if(!where) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        } 
        await this.prisma().deleteMany({
            where,
        });
        return items;
    }

    async runCount(query?: IBankSourceSchemaType["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: IBankSourceSchemaType["Query"]): Promise<IBankSourceSchemaType["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
            },
        }));
    }
    
    prisma() {
        return this.prismaClient.bank;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_b42xn1ttxv94pdoi84i8vs5r = true;