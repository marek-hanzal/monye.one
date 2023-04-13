/**
	Base Prisma Source contains default implementation of Source for entity Job connected to Prisma. This could be used for further extensions,
    also default export uses this as a parent class.
 */
import {withCursor} from "@leight/query";
import {
	$PrismaClient,
	type PrismaClient
} from "@leight/prisma";
import {type ISource} from "@leight/source";
import {AbstractSource} from "@leight/source-server";
import {
	$JobSource,
	type IJobWhere,
	type IJobWhereUnique,
	type IJobOrderBy,
	type IJobSourceSchema
} from "@leight/job";

export class JobBasePrismaSource extends AbstractSource<IJobSourceSchema> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($JobSource);
    }

    async runFind(id: string): Promise<IJobSourceSchema["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
            include: undefined,
        });
    }

    async runCreate(entity: IJobSourceSchema["Create"]): Promise<IJobSourceSchema["Entity"]> {
        return this.prisma().create({
            data: entity,
            include: undefined,
        });
    }

    async runPatch({id, ...patch}: IJobSourceSchema["Patch"]): Promise<IJobSourceSchema["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: {id},
            include: undefined,
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<IJobSourceSchema>): Promise<IJobSourceSchema["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
            include: undefined,
        });
    }

    async runCount(query?: IJobSourceSchema["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: IJobSourceSchema["Query"]): Promise<IJobSourceSchema["Entity"][]> {
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
    
    toWhere(filter?: IJobSourceSchema["Filter"]): IJobWhere | undefined {
        return filter;
    }
    
    toWhereUnique(filter: IJobSourceSchema["Filter"]): IJobWhereUnique {
        return filter as IJobWhereUnique;
    }
    
    toOrderBy(sort?: IJobSourceSchema["Sort"]): IJobOrderBy | undefined {
        return sort as IJobOrderBy;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_e5zx6rkcuiwkt2tszotylz95 = true;