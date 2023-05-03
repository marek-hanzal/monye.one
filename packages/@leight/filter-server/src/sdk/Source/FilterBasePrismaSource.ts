/**
	Base Prisma Source contains default implementation of Source for entity Filter connected to Prisma. This could be used for further extensions,
    also default export uses this as a parent class.
 */
import {
	$PrismaClient,
	type PrismaClient
} from "@leight/prisma";
import {
	withCursor,
	type ISource,
	type IWithIdentity,
	SourceError
} from "@leight/source";
import {AbstractSourceEx} from "@leight/source-server";
import {
	$FilterSource,
	type IFilterSourceSchemaType,
	type IFilterPrismaSchemaType
} from "@leight/filter";

export class FilterBasePrismaSource extends AbstractSourceEx<IFilterPrismaSchemaType, IFilterSourceSchemaType> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($FilterSource);
    }

    async runFind(id: string): Promise<IFilterSourceSchemaType["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
        });
    }

    async runFetch({filter}: IFilterSourceSchemaType["Query"]): Promise<IFilterSourceSchemaType["Entity"]> {
        return this.prisma().findFirstOrThrow({
            where: this.toWhere(filter),
        });
    }

    async runCreate(entity: IFilterSourceSchemaType["Create"]): Promise<IFilterSourceSchemaType["Entity"]> {
        return this.prisma().create({
            data: entity,
        });
    }

    async runPatch({patch, filter}: ISource.IPatch<IFilterSourceSchemaType>): Promise<IFilterSourceSchemaType["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: this.toWhereUnique(filter),
        });
    }
    
    async runPatchBy({patch, filter}: ISource.IPatchBy<IFilterSourceSchemaType>): Promise<unknown> {
        return this.prisma().updateMany({
            data:  patch,
            where: this.toWhere(filter),
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<IFilterSourceSchemaType>): Promise<IFilterSourceSchemaType["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
        });
    }

    async runDelete({id}: IWithIdentity): Promise<IFilterSourceSchemaType["Entity"]> {
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
    
    async runDeleteWith(query: IFilterSourceSchemaType["Query"]): Promise<IFilterSourceSchemaType["Entity"][]> {
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

    async runCount(query?: IFilterSourceSchemaType["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: IFilterSourceSchemaType["Query"]): Promise<IFilterSourceSchemaType["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
            },
        }));
    }
    
    prisma() {
        return this.prismaClient.filter;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_safvohm8cz9lyr63mrgy8ud5 = true;