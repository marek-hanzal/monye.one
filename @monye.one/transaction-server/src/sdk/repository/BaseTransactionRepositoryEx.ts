/**
	Implementation of Extended Repository, currently using Prisma.
    
    You should NOT modify this file until you are ABSOLUTELY sure what are you doing.
 */
import {$PrismaClient} from "@leight/prisma";
import {
	withCursor,
	SourceError
} from "@leight/source";
import {isEmpty} from "@leight/utils";
import {AbstractRepositoryEx} from "@leight/source-server";
import {
	$TransactionRepository,
	type TransactionSource,
	type ITransactionRepositorySchemaEx
} from "@monye.one/transaction";
import {type PrismaClient} from "@monye.one/prisma";

export class BaseTransactionRepositoryEx<
    TRepositoryType extends TransactionSource["Type"]["Repository"] = TransactionSource["Type"]["Repository"]
> extends AbstractRepositoryEx<
    ITransactionRepositorySchemaEx["Schema"],
    TransactionSource["Schema"]["Repository"]
> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($TransactionRepository);
    }

    async create(entity: TRepositoryType["Create"]): Promise<TRepositoryType["Entity"]> {
        return this.prisma().create({
            data: entity,
			include: this.withInclude(),
        });
    }

    async patch({patch, filter}: TRepositoryType["PatchProps"]): Promise<TRepositoryType["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: this.toWhereUnique(filter),
			include: this.withInclude(),
        });
    }
    
    async patchBy({patch, filter}: TRepositoryType["PatchByProps"]): Promise<any> {
        return this.prisma().updateMany({
            data:  patch,
            where: this.toWhere(filter),
        });
    }

    async upsert({filter, patch: update, create}: TRepositoryType["UpsertProps"]): Promise<TRepositoryType["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
			include: this.withInclude(),
        });
    }

    async delete({id}: TRepositoryType["Delete"]): Promise<TRepositoryType["Entity"]> {
        const item = await this.get(id);
        const where = this.toWhereUnique({id});
        if(!where) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        }
        await this.prisma().delete({
            where,
        });
        return item;
    }
    
    async deleteBy(query: TRepositoryType["DeleteBy"]): Promise<any> {
        const where = this.toWhere(query);
        if(isEmpty(where)) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        } 
        return this.prisma().deleteMany({
            where,
        });
    }

    async count(count?: TRepositoryType["Count"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(count),
        });
    }

    async query(query?: TRepositoryType["Query"]): Promise<TRepositoryType["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
				include: this.withInclude(),
            },
        }));
    }
    
    async fetch(filter: TRepositoryType["Fetch"]): Promise<TRepositoryType["Entity"]> {
        return this.prisma().findFirstOrThrow({
            where: this.toWhere(filter),
			include: this.withInclude(),
        });
    }
    
    async fetch$(filter: TRepositoryType["Fetch$"]): Promise<TRepositoryType["Entity"] | null> {
        return this.prisma().findFirst({
            where: this.toWhere(filter),
			include: this.withInclude(),
        });
    }
    
    async get(id: string): Promise<TRepositoryType["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
			include: this.withInclude(),
        });
    }
    
    async get$(id: string): Promise<TRepositoryType["Entity"] | null> {
        return this.prisma().findUnique({
            where: {id},
			include: this.withInclude(),
        });
    }
    
    withInclude() {
        return {"bank":true} as const;
    }
    
    prisma() {
        return this.prismaClient.transaction;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_g7zex7e50wwl066kuieemrn5 = true;