/**
	Base Prisma Source contains default implementation of Source for entity File connected to Prisma. This could be used for further extensions,
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
	$FileSource,
	type IFileSourceSchemaType,
	type IFilePrismaSchemaType
} from "@leight/file";

export class FileBasePrismaSource extends AbstractSource<IFileSourceSchemaType> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($FileSource);
    }

    async runFind(id: string): Promise<IFileSourceSchemaType["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
            include: undefined,
        });
    }

    async runCreate(entity: IFileSourceSchemaType["Create"]): Promise<IFileSourceSchemaType["Entity"]> {
        return this.prisma().create({
            data: entity,
            include: undefined,
        });
    }

    async runPatch({id, ...patch}: IFileSourceSchemaType["Patch"]): Promise<IFileSourceSchemaType["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: {id},
            include: undefined,
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<IFileSourceSchemaType>): Promise<IFileSourceSchemaType["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
            include: undefined,
        });
    }

    async runDelete({id}: IWithIdentity): Promise<IFileSourceSchemaType["Entity"]> {
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
    
    async runDeleteWith(query: IFileSourceSchemaType["Query"]): Promise<IFileSourceSchemaType["Entity"][]> {
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

    async runCount(query?: IFileSourceSchemaType["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: IFileSourceSchemaType["Query"]): Promise<IFileSourceSchemaType["Entity"][]> {
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
    
    toWhere(filter?: IFileSourceSchemaType["Filter"]): IFilePrismaSchemaType['Where'] | undefined {
        return filter;
    }
    
    toWhereUnique(filter: IFileSourceSchemaType["Filter"]): IFilePrismaSchemaType['WhereUnique'] {
        return filter as IFilePrismaSchemaType['WhereUnique'];
    }
    
    toOrderBy(sort?: IFileSourceSchemaType["Sort"]): IFilePrismaSchemaType['OrderBy'] | undefined {
        return sort as IFilePrismaSchemaType['OrderBy'];
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_nn1q703g140n6jw3mwuv2dfc = true;