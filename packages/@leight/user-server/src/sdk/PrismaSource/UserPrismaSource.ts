/**
	Base Prisma Source contains default implementation of Source for entity User connected to Prisma. This could be used for further extensions,
    also default export uses this as a parent class.
 */
import {withCursor} from "@leight/query";
import {
	$PrismaClient,
	type PrismaClient
} from "@leight/prisma";
import {
	type ISource,
	type IWithIdentity,
	SourceError
} from "@leight/source";
import {AbstractSource} from "@leight/source-server";
import {
	$UserSource,
	type IUserSourceSchemaType,
	type IUserPrismaSchemaType
} from "@leight/user";

export class UserBasePrismaSource extends AbstractSource<IUserSourceSchemaType> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($UserSource);
    }

    async runFind(id: string): Promise<IUserSourceSchemaType["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
            include: undefined,
        });
    }

    async runCreate(entity: IUserSourceSchemaType["Create"]): Promise<IUserSourceSchemaType["Entity"]> {
        return this.prisma().create({
            data: entity,
            include: undefined,
        });
    }

    async runPatch({id, ...patch}: IUserSourceSchemaType["Patch"]): Promise<IUserSourceSchemaType["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: {id},
            include: undefined,
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<IUserSourceSchemaType>): Promise<IUserSourceSchemaType["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
            include: undefined,
        });
    }

    async runDelete({id}: IWithIdentity): Promise<IUserSourceSchemaType["Entity"]> {
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
    
    async runDeleteWith(query: IUserSourceSchemaType["Query"]): Promise<IUserSourceSchemaType["Entity"][]> {
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

    async runCount(query?: IUserSourceSchemaType["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: IUserSourceSchemaType["Query"]): Promise<IUserSourceSchemaType["Entity"][]> {
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
        return this.prismaClient.user;
    }
    
    toWhere(filter?: IUserSourceSchemaType["Filter"]): IUserPrismaSchemaType['Where'] | undefined {
        throw new SourceError(`Filter is not supported in [${String($UserSource)}] Source.`);
    }
    
    toWhereUnique(filter: IUserSourceSchemaType["Filter"]): IUserPrismaSchemaType['WhereUnique'] {
        throw new SourceError(`Unique filter is not supported in [${String($UserSource)}] Source.`);
    }
    
    toOrderBy(sort?: IUserSourceSchemaType["Sort"]): IUserPrismaSchemaType['OrderBy'] | undefined {
        return sort as IUserPrismaSchemaType['OrderBy'];
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ct48ji30dbwhl9rlwrtzezc9 = true;