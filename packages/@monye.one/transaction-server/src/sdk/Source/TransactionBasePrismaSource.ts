/**
 Base Prisma Source contains default implementation of Source for entity Transaction connected to Prisma. This could be used for further extensions,
 also default export uses this as a parent class.
 */
import {$PrismaClient}     from "@leight/prisma";
import {
    type ISource,
    type IWithIdentity,
    SourceError,
    withCursor
}                          from "@leight/source";
import {AbstractSourceEx}  from "@leight/source-server";
import {type PrismaClient} from "@monye.one/prisma";
import {
    $TransactionSource,
    type ITransactionPrismaSchemaType,
    type ITransactionSourceSchemaType
}                          from "@monye.one/transaction";

export class TransactionBasePrismaSource extends AbstractSourceEx<ITransactionPrismaSchemaType, ITransactionSourceSchemaType> {
    static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($TransactionSource);
    }

    async runFind(id: string): Promise<ITransactionSourceSchemaType["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where:   {id},
            include: {"bank": true},
        });
    }

    async runFetch({filter}: ITransactionSourceSchemaType["Query"]): Promise<ITransactionSourceSchemaType["Entity"]> {
        return this.prisma().findFirstOrThrow({
            where:   this.toWhere(filter),
            include: {"bank": true},
        });
    }

    async runCreate(entity: ITransactionSourceSchemaType["Create"]): Promise<ITransactionSourceSchemaType["Entity"]> {
        return this.prisma().create({
            data:    entity,
            include: {"bank": true},
        });
    }

    async runPatch({patch, filter}: ISource.IPatch<ITransactionSourceSchemaType>): Promise<ITransactionSourceSchemaType["Entity"]> {
        return this.prisma().update({
            data:    patch,
            where:   this.toWhereUnique(filter),
            include: {"bank": true},
        });
    }

    async runPatchBy({patch, filter}: ISource.IPatchBy<ITransactionSourceSchemaType>): Promise<unknown> {
        console.log("PatchBy!", patch, filter, this.toWhere(filter));
        return this.prisma().updateMany({
            data:  patch,
            where: this.toWhere(filter),
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<ITransactionSourceSchemaType>): Promise<ITransactionSourceSchemaType["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where:   this.toWhereUnique(filter),
            include: {"bank": true},
        });
    }

    async runDelete({id}: IWithIdentity): Promise<ITransactionSourceSchemaType["Entity"]> {
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

    async runDeleteWith(query: ITransactionSourceSchemaType["Query"]): Promise<ITransactionSourceSchemaType["Entity"][]> {
        const items = await this.query(query);
        const where = this.toWhere(query.filter);
        if (!where) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        }
        await this.prisma().deleteMany({
            where,
        });
        return items;
    }

    async runCount(query?: ITransactionSourceSchemaType["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: ITransactionSourceSchemaType["Query"]): Promise<ITransactionSourceSchemaType["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
                include: {"bank": true},
            },
        }));
    }

    prisma() {
        return this.prismaClient.transaction;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_zmf6kvzv4e0vyzwlwhmlcai7 = true;
