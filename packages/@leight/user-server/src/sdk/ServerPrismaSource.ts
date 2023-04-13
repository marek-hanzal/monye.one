/**
	Base Prisma Source contains default implementation of Source for entity User connected to Prisma. This could be used for further extensions,
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
	$UserSource,
	type IUserWhere,
	type IUserWhereUnique,
	type IUserOrderBy,
	type IUserSourceSchema
} from "@leight/user";

export class UserBasePrismaSource extends AbstractSource<IUserSourceSchema> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($UserSource);
    }

    async runFind(id: string): Promise<IUserSourceSchema["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
            include: undefined,
        });
    }

    async runCreate(entity: IUserSourceSchema["Create"]): Promise<IUserSourceSchema["Entity"]> {
        return this.prisma().create({
            data: entity,
            include: undefined,
        });
    }

    async runPatch({id, ...patch}: IUserSourceSchema["Patch"]): Promise<IUserSourceSchema["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: {id},
            include: undefined,
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<IUserSourceSchema>): Promise<IUserSourceSchema["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
            include: undefined,
        });
    }

    async runCount(query?: IUserSourceSchema["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: IUserSourceSchema["Query"]): Promise<IUserSourceSchema["Entity"][]> {
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
    
    toWhere(filter?: IUserSourceSchema["Filter"]): IUserWhere | undefined {
        return filter;
    }
    
    toWhereUnique(filter: IUserSourceSchema["Filter"]): IUserWhereUnique {
        return filter as IUserWhereUnique;
    }
    
    toOrderBy(sort?: IUserSourceSchema["Sort"]): IUserOrderBy | undefined {
        return sort as IUserOrderBy;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ype2sicq7ssonqfj322c0001 = true;