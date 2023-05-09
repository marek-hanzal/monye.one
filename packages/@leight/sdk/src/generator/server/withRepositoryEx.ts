import {withSourceFile} from "@leight/generator-server";
import {normalize} from "node:path";
import {type IGenerator} from "../../api";

export interface IWithRepositoryExParams {
    repositories: IWithRepositoryExParams.IRepository[];
}

export namespace IWithRepositoryExParams {
    export interface IRepository {
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
        params: {repositories},
    }) => {
    repositories.forEach(({name, prisma, packages, withInclude}) => {
        console.log(`- Generating [withRepositoryEx] [${name}]`);

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
                    [`Base${name}RepositoryEx<
    TRepositoryType extends ${name}Source["Type"]["Repository"] = ${name}Source["Type"]["Repository"]
>`]: {
                        extends: `AbstractRepositoryEx<
    I${name}RepositorySchemaEx["Schema"],
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

    async create(entity: TRepositoryType["Create"]): Promise<TRepositoryType["Entity"]> {
        return this.prisma().create({
            data: entity,${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }

    async patch({patch, filter}: TRepositoryType["PatchProps"]): Promise<TRepositoryType["Entity"]> {
        return this.prisma().update({
            data: patch,
            where: this.toWhereUnique(filter),${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }
    
    async patchBy({patch, filter}: TRepositoryType["PatchByProps"]): Promise<unknown> {
        return this.prisma().updateMany({
            data:  patch,
            where: this.toWhere(filter),
        });
    }

    async upsert({filter, patch: update, create}: TRepositoryType["UpsertProps"]): Promise<TRepositoryType["Entity"]> {
        return this.prisma().upsert({
            create,
            update,
            where: this.toWhereUnique(filter),${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }

    async delete({id}: TRepositoryType["Delete"]): Promise<TRepositoryType["Entity"]> {
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
    
    async deleteBy(query: TRepositoryType["DeleteBy"]): Promise<unknown> {
        const where = this.toWhere(query);
        if(isEmpty(where)) {
            throw new SourceError("Cannot delete an item with an empty where condition!");
        } 
        return this.prisma().deleteMany({
            where,
        });
    }

    async count(count?: TRepositoryType["Count"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(count),
        });
    }

    async query(query?: TRepositoryType["Query"]): Promise<TRepositoryType["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),${withInclude ? `\n\t\t\t\tinclude: this.withInclude(),` : ""}
            },
        }));
    }
    
    async fetch(filter: TRepositoryType["Fetch"]): Promise<TRepositoryType["Entity"]> {
        return this.prisma().findFirstOrThrow({
            where: this.toWhere(filter),${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }
    
    async fetch$(filter: TRepositoryType["Fetch$"]): Promise<TRepositoryType["Entity"] | null> {
        return this.prisma().findFirst({
            where: this.toWhere(filter),${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }
    
    async get(id: string): Promise<TRepositoryType["Entity"]> {
        return this.prisma().findUniqueOrThrow({
            where: {id},${withInclude ? `\n\t\t\tinclude: this.withInclude(),` : ""}
        });
    }
    
    async get$(id: string): Promise<TRepositoryType["Entity"] | null> {
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
