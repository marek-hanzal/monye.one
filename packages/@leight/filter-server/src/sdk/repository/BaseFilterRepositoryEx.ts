/**
	Implementation of Extended Repository, currently using Prisma.
    
    You should NOT modify this file until you are ABSOLUTELY sure what are you doing.
 */
import {
	$PrismaClient,
	type PrismaClient
} from "@leight/prisma";
import {
	withCursor,
	SourceError
} from "@leight/source";
import {isEmpty} from "@leight/utils";
import {AbstractRepositoryEx} from "@leight/source-server";
import {
	$FilterRepository,
	type FilterSource,
	type IFilterRepositorySchemaEx
} from "@leight/filter";

export class BaseFilterRepositoryEx extends AbstractRepositoryEx<
    IFilterRepositorySchemaEx,
    FilterSource['Schema']['Repository']
> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($FilterRepository);
    }

    async create(entity: FilterSource["Type"]["Repository"]["Create"]): Promise<FilterSource["Type"]["Repository"]["Entity"]> {
        return this.prisma().create({
            data: entity,
        });
    }

    async patch({patch, filter}: FilterSource["Type"]["Repository"]["PatchProps"]): Promise<FilterSource["Type"]["Repository"]["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: this.toWhereUnique(filter),
        });
    }
    
    async patchBy({patch, filter}: FilterSource["Type"]["Repository"]["PatchByProps"]): Promise<unknown> {
        return this.prisma().updateMany({
            data:  patch,
            where: this.toWhere(filter),
        });
    }

    async upsert({filter, patch: update, create}: FilterSource["Type"]["Repository"]["UpsertProps"]): Promise<FilterSource["Type"]["Repository"]["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
        });
    }

    async delete({id}: FilterSource["Type"]["Repository"]["Delete"]): Promise<FilterSource["Type"]["Repository"]["Entity"]> {
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
    
    async deleteBy(query: FilterSource["Type"]["Repository"]["DeleteBy"]): Promise<unknown> {
        const where = this.toWhere(query);
        if(isEmpty(where)) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        } 
        return this.prisma().deleteMany({
            where,
        });
    }

    async count(count?: FilterSource["Type"]["Repository"]["Count"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(count),
        });
    }

    async query(query?: FilterSource["Type"]["Repository"]["Query"]): Promise<FilterSource["Type"]["Repository"]["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
            },
        }));
    }
    
    async fetch(filter: FilterSource["Type"]["Repository"]["Fetch"]): Promise<FilterSource["Type"]["Repository"]["Entity"]> {
        return this.prisma().findFirstOrThrow({
            where: this.toWhere(filter),
        });
    }
    
    async fetch$(filter: FilterSource["Type"]["Repository"]["Fetch$"]): Promise<FilterSource["Type"]["Repository"]["Entity"] | null> {
        return this.prisma().findFirst({
            where: this.toWhere(filter),
        });
    }
    
    async get(id: string): Promise<FilterSource["Type"]["Repository"]["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
        });
    }
    
    async get$(id: string): Promise<FilterSource["Type"]["Repository"]["Entity"] | null> {
        return this.prisma().findUnique({
            where: {id},
        });
    }
    
    withInclude() {
        return undefined;
    }
    
    prisma() {
        return this.prismaClient.filter;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_fl7a71ecv5f90l3evqt14nzy = true;