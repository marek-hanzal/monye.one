/**
	Base Prisma Source contains default implementation of Source for entity Label connected to Prisma. This could be used for further extensions,
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
	$LabelSource,
	type ILabelSourceSchemaType,
	type ILabelPrismaSchemaType
} from "@leight/label";

export class LabelBasePrismaSource extends AbstractSourceEx<ILabelPrismaSchemaType, ILabelSourceSchemaType> {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($LabelSource);
    }

    async runFind(id: string): Promise<ILabelSourceSchemaType["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
        });
    }

    async runFetch({filter}: ILabelSourceSchemaType["Query"]): Promise<ILabelSourceSchemaType["Entity"]> {
        return this.prisma().findFirstOrThrow({
            where: this.toWhere(filter),
        });
    }

    async runCreate(entity: ILabelSourceSchemaType["Create"]): Promise<ILabelSourceSchemaType["Entity"]> {
        return this.prisma().create({
            data: entity,
        });
    }

    async runPatch({patch, filter}: ISource.IPatch<ILabelSourceSchemaType>): Promise<ILabelSourceSchemaType["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: this.toWhereUnique(filter),
        });
    }
    
    async runPatchBy({patch, filter}: ISource.IPatchBy<ILabelSourceSchemaType>): Promise<unknown> {
        return this.prisma().updateMany({
            data:  patch,
            where: this.toWhere(filter),
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<ILabelSourceSchemaType>): Promise<ILabelSourceSchemaType["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
        });
    }

    async runDelete({id}: IWithIdentity): Promise<ILabelSourceSchemaType["Entity"]> {
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
    
    async runDeleteWith(query: ILabelSourceSchemaType["Query"]): Promise<ILabelSourceSchemaType["Entity"][]> {
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

    async runCount(query?: ILabelSourceSchemaType["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: ILabelSourceSchemaType["Query"]): Promise<ILabelSourceSchemaType["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
            },
        }));
    }
    
    prisma() {
        return this.prismaClient.label;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_e96xt2hjw84u4ai7p3w0og2e = true;