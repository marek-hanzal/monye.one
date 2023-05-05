import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IWithRepositoryExParams {
    entities: IWithRepositoryExParams.IEntity[];
}

export namespace IWithRepositoryExParams {
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
         * Package used to import all schema-related types
         */
        schema: string;
        /**
         * Prisma package which exports PrismaClient.
         */
        prisma: string;
    }
}

export const withRepositoryEx: IGenerator<IWithRepositoryExParams> = async (
    {
        barrel,
        directory,
        params: {entities},
    }) => {
    entities.forEach(({name, prisma, packages, withInclude}) => {
        const $withInclude = withInclude ? JSON.stringify(withInclude) : undefined;

        withSourceFile()
            .withHeader(`
    Implementation of Extended Repository, currently using Prisma.
    
    You should NOT modify this file until you are ABSOLUTELY sure what are you doing.
        `)
            .withImports({
                imports: {
                    "@leight/prisma":        [
                        "$PrismaClient",
                    ],
                    "@leight/source":        [
                        "withCursor",
                        "SourceError",
                    ],
                    "@leight/utils":         [
                        "isEmpty",
                    ],
                    "@leight/source-server": [
                        "AbstractRepositoryEx",
                    ],
                },
            })
            .withImports({
                imports: {
                    [packages.schema]: [
                        `$${name}Repository`,
                        `type ${name}Source`,
                        `type I${name}RepositorySchemaEx`,
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
                    [`Base${name}RepositoryEx`]: {
                        extends: `AbstractRepositoryEx<
    I${name}RepositorySchemaEx,
    ${name}Source["Schema"]["Repository"]
>`,
                        body:    `
    static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($${name}Repository);
    }

    async create(entity: ${name}Source["Type"]["Repository"]["Create"]): Promise<${name}Source["Type"]["Repository"]["Entity"]> {
        return this.prisma().create({
            data: entity,${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }

    async patch({patch, filter}: ${name}Source["Type"]["Repository"]["PatchProps"]): Promise<${name}Source["Type"]["Repository"]["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: this.toWhereUnique(filter),${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }
    
    async patchBy({patch, filter}: ${name}Source["Type"]["Repository"]["PatchByProps"]): Promise<unknown> {
        return this.prisma().updateMany({
            data:  patch,
            where: this.toWhere(filter),
        });
    }

    async upsert({filter, patch: update, create}: ${name}Source["Type"]["Repository"]["UpsertProps"]): Promise<${name}Source["Type"]["Repository"]["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }

    async delete({id}: ${name}Source["Type"]["Repository"]["Delete"]): Promise<${name}Source["Type"]["Repository"]["Entity"]> {
        const item = await this.get(id);
        const where = this.toWhereUnique({id});
        if(!where) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        }
        await this.prisma().delete({
            where,
        });
        return item;
    }
    
    async deleteBy(query: ${name}Source["Type"]["Repository"]["DeleteBy"]): Promise<unknown> {
        const where = this.toWhere(query);
        if(isEmpty(where)) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        } 
        return this.prisma().deleteMany({
            where,
        });
    }

    async count(count?: ${name}Source["Type"]["Repository"]["Count"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(count),
        });
    }

    async query(query?: ${name}Source["Type"]["Repository"]["Query"]): Promise<${name}Source["Type"]["Repository"]["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),${withInclude ? `\n\t\t\t\tinclude: this.withInclude(),` : ""}
            },
        }));
    }
    
    async fetch(filter: ${name}Source["Type"]["Repository"]["Fetch"]): Promise<${name}Source["Type"]["Repository"]["Entity"]> {
        return this.prisma().findFirstOrThrow({
            where: this.toWhere(filter),${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }
    
    async fetch$(filter: ${name}Source["Type"]["Repository"]["Fetch$"]): Promise<${name}Source["Type"]["Repository"]["Entity"] | null> {
        return this.prisma().findFirst({
            where: this.toWhere(filter),${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }
    
    async get(id: string): Promise<${name}Source["Type"]["Repository"]["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }
    
    async get$(id: string): Promise<${name}Source["Type"]["Repository"]["Entity"] | null> {
        return this.prisma().findUnique({
            where: {id},${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }
    
    withInclude() {
        return ${$withInclude ? `${$withInclude} as const` : "undefined"};
    }
    
    prisma() {
        return this.prismaClient.${prisma};
    }
                    `,
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/repository/Base${name}RepositoryEx.ts`),
                barrel,
            });
    });
};
