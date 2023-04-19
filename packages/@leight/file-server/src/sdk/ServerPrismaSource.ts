/**
	Base Prisma Source contains default implementation of Source for entity File connected to Prisma. This could be used for further extensions,
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
	$FileSource,
	IFileSourceSchema,
	type IFilePrismaSchema
} from "@leight/file";

export class FileBasePrismaSource extends AbstractSource<IFileSourceSchema> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($FileSource);
    }

    async runFind(id: string): Promise<IFileSourceSchema["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
            include: undefined,
        });
    }

    async runCreate(entity: IFileSourceSchema["Create"]): Promise<IFileSourceSchema["Entity"]> {
        return this.prisma().create({
            data: entity,
            include: undefined,
        });
    }

    async runPatch({id, ...patch}: IFileSourceSchema["Patch"]): Promise<IFileSourceSchema["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: {id},
            include: undefined,
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<IFileSourceSchema>): Promise<IFileSourceSchema["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
            include: undefined,
        });
    }

    async runCount(query?: IFileSourceSchema["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: IFileSourceSchema["Query"]): Promise<IFileSourceSchema["Entity"][]> {
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
        return this.prismaClient.file;
    }
    
    toWhere(filter?: IFileSourceSchema["Filter"]): IFilePrismaSchema['Where'] | undefined {
        return filter;
    }
    
    toWhereUnique(filter: IFileSourceSchema["Filter"]): IFilePrismaSchema['WhereUnique'] {
        return filter as IFilePrismaSchema['WhereUnique'];
    }
    
    toOrderBy(sort?: IFileSourceSchema["Sort"]): IFilePrismaSchema['OrderBy'] | undefined {
        return sort as IFilePrismaSchema['OrderBy'];
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_c9nja5p7vr0j3pw0r7dfh577 = true;