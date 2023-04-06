import {withSourceFile}              from "@leight/generator-server";
import {normalize}                   from "node:path";
import {type IGenerator}             from "../../api";
import {type IGeneratorServerParams} from "./generatorServer";

export const generatorServerBaseSource: IGenerator<IGeneratorServerParams> = async (
    {
        barrel,
        folder,
        params: {
                    packages,
                    entities,
                    header,
                },
    }) => {
    const file = withSourceFile();

    entities.forEach(({name: entity, prisma, packages: $packages}) => {
        const packageSchema = $packages?.schema || packages?.schema;

        file.withHeader(header || `
    Base Source contains default implementation of Source for entity ${entity}. This could be used for further extensions,
    also default export uses this as a parent class.
        `);

        if (prisma && packages?.prisma && packageSchema) {
            file.withImports({
                    imports: {
                        "@leight/query":         [
                            "withCursor",
                        ],
                        "@leight/prisma":        [
                            "$PrismaClient",
                        ],
                        "@leight/source":        [
                            "type ISource",
                            "withUpsert",
                        ],
                        "@leight/source-server": [
                            "AbstractSource",
                        ],
                    },
                })
                .withImports({
                    imports: {
                        [packageSchema]: [
                            `$${entity}Source`,
                            `type I${entity}Where`,
                            `type I${entity}WhereUnique`,
                            `type I${entity}OrderBy`,
                            `type I${entity}SourceSchema`,
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
                        [`${entity}BaseSource`]: {
                            extends: `AbstractSource<I${entity}SourceSchema>`,
                            body:    `
    static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($${entity}Source);
    }

    async runUpsert(props: ISource.IUpsert<I${entity}SourceSchema>): Promise<I${entity}SourceSchema["Entity"]> {
        return this.prisma().upsert(withUpsert(props));
    }

    async runCount(query?: I${entity}SourceSchema["Query"]): Promise<number> {
        return this.prisma().count({
            where: this.toWhere(query?.filter),
        });
    }

    async runQuery(query?: I${entity}SourceSchema["Query"]): Promise<I${entity}SourceSchema["Entity"][]> {
        return this.prisma().findMany(withCursor({
            query,
            arg: {
                where:   this.toWhere(query?.filter),
                orderBy: this.toOrderBy(query?.sort),
            }
        }));
    }
    
    prisma() {
        return this.prismaClient.${prisma};
    }
    
    toWhere(filter?: I${entity}SourceSchema["Filter"]): I${entity}Where | undefined {
        return undefined;
    }
    
    toWhereUnique(filter?: I${entity}SourceSchema["Filter"]): I${entity}WhereUnique | undefined {
        return undefined;
    }
    
    toOrderBy(sort?: I${entity}SourceSchema["Sort"]): I${entity}OrderBy | undefined {
        return sort as I${entity}OrderBy;
    }
                    `,
                        },
                    },
                });
            return;
        }

        file.withImports({
                imports: {
                    "@leight/source-server": [
                        "AbstractSource",
                    ],
                },
            })
            .withImports({
                imports: packageSchema ? {
                    [packageSchema]: [
                        `$${entity}Source`,
                        `type I${entity}SourceSchema`,
                    ],
                } : {},
            })
            .withClasses({
                exports: {
                    [`${entity}BaseSource`]: {
                        extends: `AbstractSource<I${entity}SourceSchema>`,
                        body:    `
    constructor() {
        super($${entity}Source);
    }
                    `,
                    },
                },
            });
    });

    file.saveTo({
        file: normalize(`${process.cwd()}/${folder}/ServerBaseSource.ts`),
        barrel,
    });
};
