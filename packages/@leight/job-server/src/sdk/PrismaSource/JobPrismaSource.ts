/**
 Base Prisma Source contains default implementation of Source for entity Job connected to Prisma. This could be used for further extensions,
 also default export uses this as a parent class.
 */
import {
    $JobSource,
    type IJobPrismaSchemaType,
    type IJobSourceSchemaType
}                       from "@leight/job";
import {
    $PrismaClient,
    type PrismaClient
}                       from "@leight/prisma";
import {withCursor}     from "@leight/query";
import {
    type ISource,
    type IWithIdentity,
    SourceError
}                       from "@leight/source";
import {AbstractSource} from "@leight/source-server";

export class JobBasePrismaSource extends AbstractSource<IJobSourceSchemaType> {
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
            where:   {id},
            include: undefined,
        });
    }

    async runCreate(entity: IJobSourceSchemaType["Create"]): Promise<IJobSourceSchemaType["Entity"]> {
        return this.prisma().create({
            data:    entity,
            include: undefined,
        });
    }

    async runPatch({id, ...patch}: IJobSourceSchemaType["Patch"]): Promise<IJobSourceSchemaType["Entity"]> {
        return this.prisma().update({
            data:    patch,
            where:   {id},
            include: undefined,
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<IJobSourceSchemaType>): Promise<IJobSourceSchemaType["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where:   this.toWhereUnique(filter),
            include: undefined,
        });
    }

    async runDelete({id}: IWithIdentity): Promise<IJobSourceSchemaType["Entity"]> {
        const item  = await this.find(id);
        const where = this.toWhereUnique({id});
        if (!where) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        }
        await this.prisma().delete({
            where,
        });
        return item;
    }

    async runDeleteWith(query: IJobSourceSchemaType["Query"]): Promise<IJobSourceSchemaType["Entity"][]> {
        const items = await this.query(query);
        const where = this.toWhereUnique(query.filter);
        if (!where) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        }
        await this.prisma().delete({
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
                include: undefined,
            },
        }));
    }

    prisma() {
        return this.prismaClient.job;
    }

    toWhere(filter?: IJobSourceSchemaType["Filter"]): IJobPrismaSchemaType["Where"] | undefined {
        return filter;
    }

    toWhereUnique(filter: IJobSourceSchemaType["Filter"]): IJobPrismaSchemaType["WhereUnique"] {
        return filter as IJobPrismaSchemaType["WhereUnique"];
    }

    toOrderBy(sort?: IJobSourceSchemaType["Sort"]): IJobPrismaSchemaType["OrderBy"] | undefined {
        return sort as IJobPrismaSchemaType["OrderBy"];
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_k5c70nvv2pisholag4f5mweg = true;
