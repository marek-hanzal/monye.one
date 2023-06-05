/**
	Implementation of Extended Repository, currently using Prisma.
    
    You should NOT modify this file until you are ABSOLUTELY sure what are you doing.
 */
import {
	withCursor,
	SourceError
} from "@leight/source";
import {isEmpty} from "@leight/utils";
import {AbstractRepositoryEx} from "@leight/source-server";
import {
	$UserRepository,
	type UserSource,
	type IUserRepositorySchemaEx
} from "@leight/user";

export class BaseUserRepositoryEx<
    TRepositoryType extends UserSource["Type"]["Repository"] = UserSource["Type"]["Repository"]
> extends AbstractRepositoryEx<
    IUserRepositorySchemaEx["Schema"],
    UserSource["Schema"]["Repository"]
> {
	static inject = [
    ];

    constructor(
    ) {
        super($UserRepository);
    }

    async create(entity: TRepositoryType["Create"]): Promise<TRepositoryType["Entity"]> {
        return this.prisma().create({
            data: entity,
        });
    }

    async patch({patch, filter}: TRepositoryType["PatchProps"]): Promise<TRepositoryType["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: this.toWhereUnique(filter),
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
            },
        }));
    }
    
    async fetch(filter: TRepositoryType["Fetch"]): Promise<TRepositoryType["Entity"]> {
        return this.prisma().findFirstOrThrow({
            where: this.toWhere(filter),
        });
    }
    
    async fetch$(filter: TRepositoryType["Fetch$"]): Promise<TRepositoryType["Entity"] | null> {
        return this.prisma().findFirst({
            where: this.toWhere(filter),
        });
    }
    
    async get(id: string): Promise<TRepositoryType["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
        });
    }
    
    async get$(id: string): Promise<TRepositoryType["Entity"] | null> {
        return this.prisma().findUnique({
            where: {id},
        });
    }
    
    withInclude() {
        return undefined;
    }
    
    prisma() {
        throw new Error('Not supported. EdgeDB is waiting!');
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_feqze1mo3kghleb2oaws8ias = true;