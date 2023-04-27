/**
	Base Prisma Source contains default implementation of Source for entity Job connected to Prisma. This could be used for further extensions,
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
	$JobSource,
	type IJobSourceSchemaType,
	type IJobPrismaSchemaType
} from "@leight/job";

export class JobBasePrismaSource extends AbstractSourceEx<IJobPrismaSchemaType, IJobSourceSchemaType> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($JobSource);
    }

    async runFind(id: string): Promise<IJobSourceSchemaType["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
        });
    }

    async runCreate(entity: IJobSourceSchemaType["Create"]): Promise<IJobSourceSchemaType["Entity"]> {
        return this.prisma().create({
            data: entity,
        });
    }

    async runPatch({id, ...patch}: IJobSourceSchemaType["Patch"]): Promise<IJobSourceSchemaType["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: {id},
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<IJobSourceSchemaType>): Promise<IJobSourceSchemaType["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
        });
    }

    async runDelete({id}: IWithIdentity): Promise<IJobSourceSchemaType["Entity"]> {
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
    
    async runDeleteWith(query: IJobSourceSchemaType["Query"]): Promise<IJobSourceSchemaType["Entity"][]> {
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

    async runCount(query?: IJobSourceSchemaType["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: IJobSourceSchemaType["Query"]): Promise<IJobSourceSchemaType["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
            },
        }));
    }
    
    prisma() {
        return this.prismaClient.job;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_unkv7y1p826oe8lbe9822wut = true;