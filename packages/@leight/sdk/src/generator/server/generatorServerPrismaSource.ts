import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorServerPrismaSourceParams {
    entities: IGeneratorServerPrismaSourceParams.IEntity[];
}

export namespace IGeneratorServerPrismaSourceParams {
    export interface IEntity {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        /**
         * Name of prisma "repository" (to generate prismaClient.<prisma> calls); usually snakeCase model name.
         */
        prisma: string;
        /**
         * Required package imports
         */
        packages: IPackages;
        /**
         * Generates additional includes in the PrismaSource
         */
        withInclude?: Record<string, any>;
    }

    export interface IPackages {
        /**
         * Package used to import all schema-related types (ISource implementation, IWhere and so on, can be generated by @leight).
         */
        schema: string;
        /**
         * Prisma package which exports PrismaClient.
         */
        prisma: string;
    }
}

export const generatorServerPrismaSource: IGenerator<IGeneratorServerPrismaSourceParams> = async (
    {
        barrel,
        directory,
        params: {entities},
    }) => {
    entities.forEach(({name, prisma, packages, withInclude}) => {
        const $withInclude = withInclude ? JSON.stringify(withInclude) : "undefined";

        withSourceFile()
            .withHeader(`
    Base Prisma Source contains default implementation of Source for entity ${name} connected to Prisma. This could be used for further extensions,
    also default export uses this as a parent class.
        `)
            .withImports({
                imports: {
                    "@leight/query":         [
                        "withCursor",
                    ],
                    "@leight/prisma":        [
                        "$PrismaClient",
                    ],
                    "@leight/source":        [
                        "type ISource",
                        "type IWithIdentity",
                    ],
                    "@leight/source-server": [
                        "AbstractSource",
                    ],
                },
            })
            .withImports({
                imports: {
                    [packages.schema]: [
                        `$${name}Source`,
                        `type I${name}SourceSchema`,
                        `type I${name}PrismaSchema`,
                    ],
                },
            })
            .withImports({
                imports: {
                    [packages.prisma]: [
                        "type PrismaClient",
                    ],
                },
            })
            .withClasses({
                exports: {
                    [`${name}BasePrismaSource`]: {
                        extends: `AbstractSource<I${name}SourceSchema>`,
                        body:    `
    static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($${name}Source);
    }

    async runFind(id: string): Promise<I${name}SourceSchema["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},
            include: ${$withInclude},
        });
    }

    async runCreate(entity: I${name}SourceSchema["Create"]): Promise<I${name}SourceSchema["Entity"]> {
        return this.prisma().create({
            data: entity,
            include: ${$withInclude},
        });
    }

    async runPatch({id, ...patch}: I${name}SourceSchema["Patch"]): Promise<I${name}SourceSchema["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: {id},
            include: ${$withInclude},
        });
    }

    async runUpsert({filter, patch: update, create}: ISource.IUpsert<I${name}SourceSchema>): Promise<I${name}SourceSchema["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),
            include: ${$withInclude},
        });
    }

    async runDelete({id}: IWithIdentity): Promise<I${name}SourceSchema["Entity"]> {
        const item = await this.find(id);
        await this.prisma().delete({
            where: {id},
        });
        return item;
    }

    async runCount(query?: I${name}SourceSchema["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: I${name}SourceSchema["Query"]): Promise<I${name}SourceSchema["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
                include: ${$withInclude},
            },
        }));
    }
    
    prisma() {
        return this.prismaClient.${prisma};
    }
    
    toWhere(filter?: I${name}SourceSchema["Filter"]): I${name}PrismaSchema['Where'] | undefined {
        return filter;
    }
    
    toWhereUnique(filter: I${name}SourceSchema["Filter"]): I${name}PrismaSchema['WhereUnique'] {
        return filter as I${name}PrismaSchema['WhereUnique'];
    }
    
    toOrderBy(sort?: I${name}SourceSchema["Sort"]): I${name}PrismaSchema['OrderBy'] | undefined {
        return sort as I${name}PrismaSchema['OrderBy'];
    }
                    `,
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/PrismaSource/${name}PrismaSource.ts`),
                barrel,
            });
    });
};
