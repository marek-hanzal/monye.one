import {IPackageType}    from "@leight/generator";
import {
    withPackageImport,
    withPackageType,
    withSourceFile
}                        from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorServerSourceParams {
    entities: IGeneratorServerSourceParams.IEntity[];
}

export namespace IGeneratorServerSourceParams {
    export interface IEntity {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        /**
         * Required package imports
         */
        packages: IPackages;
        /**
         * If you want to extend default Source implementation by your own
         * stuff, put here a type and package it's coming from
         */
        sourceEx?: IPackageType;
        serviceEx?: IPackageType;
        mapperEx?: IPackageType;
        /**
         * If the Source is using Prisma connection, you should put "true" here as it's included
         * from different package.
         */
        withPrisma?: boolean;
    }

    export interface IPackages {
        /**
         * Package used to import all schema-related types (ISource implementation, IWhere and so on, can be generated by @leight).
         */
        schema: string;
    }
}

export const generatorServerSource: IGenerator<IGeneratorServerSourceParams> = async (
    {
        barrel,
        directory,
        params: {entities},
    }) => {
    entities.forEach(({name, sourceEx, mapperEx, serviceEx, withPrisma, packages}) => {
        const baseSource = withPrisma ? `${name}BasePrismaSource` : `${name}BaseSource`;

        withSourceFile()
            .withImports({
                imports: {
                    [packages.schema]: [
                        `type I${name}Source`,
                    ],
                },
            })
            .withImports(sourceEx?.type ? undefined : {
                imports: {
                    [withPrisma ? `./${name}BasePrismaSource` : `./${name}BaseSource`]: [
                        baseSource,
                    ],
                },
            })
            .withImports(sourceEx?.withPackage ? {
                imports: {
                    [sourceEx.withPackage.package]: [
                        withPackageImport(sourceEx),
                    ],
                },
            } : undefined)
            .withClasses({
                exports: {
                    [`${name}Source`]: {
                        extends:    sourceEx?.type ? withPackageType(sourceEx) : baseSource,
                        implements: `I${name}Source`,
                    },
                }
            })
            .saveTo({
                file: normalize(`${directory}/Source/${name}Source.ts`),
                barrel,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source-server": [
                        `AbstractSourceMapper`,
                    ],
                    [packages.schema]:       [
                        `type I${name}SourceSchemaType`,
                        `type I${name}SourceMapper`,
                    ],
                },
            })
            .withClasses({
                exports: {
                    [`${name}BaseSourceMapper`]: {
                        extends:    `AbstractSourceMapper<I${name}SourceSchemaType>`,
                        implements: `I${name}SourceMapper`,
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/SourceMapper/${name}BaseSourceMapper.ts`),
                barrel,
            });

        withSourceFile()
            .withImports({
                imports: {
                    [packages.schema]: [
                        `type I${name}SourceMapper`,
                    ],
                }
            })
            .withImports({
                imports: mapperEx?.withPackage ? {
                    [mapperEx.withPackage.package]: [
                        withPackageImport(mapperEx),
                    ],
                } : {
                    [`./${name}BaseSourceMapper`]: [
                        `${name}BaseSourceMapper`,
                    ],
                },
            })
            .withClasses({
                exports: {
                    [`${name}SourceMapper`]: {
                        extends:    mapperEx?.type ? withPackageType(mapperEx) : `${name}BaseSourceMapper`,
                        implements: `I${name}SourceMapper`,
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/SourceMapper/${name}SourceMapper.ts`),
                barrel,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source-server": [
                        "AbstractSourceService",
                    ],
                    "@leight/source":        [
                        "type ISourceService",
                        "type ISourceMapper",
                        "type ISource",
                    ],
                    [packages.schema]:       [
                        `$${name}Source`,
                        `$${name}SourceMapper`,
                        `type I${name}SourceSchemaType`,
                    ],
                },
            })
            .withInterfaces({
                exports: {
                    [`I${name}SourceService`]: {
                        extends: [
                            {
                                type: `ISourceService<I${name}SourceSchemaType>`,
                            },
                        ],
                    },
                },
            })
            .withClasses({
                exports: {
                    [`${name}BaseSourceService`]: {
                        implements: `I${name}SourceService`,
                        extends:    `AbstractSourceService<I${name}SourceSchemaType>`,
                        body:       `
static inject = [
        $${name}Source,
        $${name}SourceMapper,
    ];
    
    constructor(
        protected $source: ISource<I${name}SourceSchemaType>,
        protected $mapper: ISourceMapper<I${name}SourceSchemaType>,
    ) {
        super();
    }
    
    source(): ISource<I${name}SourceSchemaType> {
        return this.$source;
    }
    
    mapper(): ISourceMapper<I${name}SourceSchemaType> {
        return this.$mapper;
    }
                        `
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/ServerSourceService/${name}BaseSourceService.ts`),
                barrel,
            });

        withSourceFile()
            .withImports({
                imports: {
                    [`./${name}BaseSourceService`]: [
                        `type I${name}SourceService`,
                    ],
                },
            })
            .withImports({
                imports: serviceEx?.withPackage ? {
                    [serviceEx.withPackage.package]: [
                        withPackageImport(serviceEx),
                    ],
                } : {
                    [`./${name}BaseSourceService`]: [
                        `${name}BaseSourceService`,
                    ],
                },
            })
            .withClasses({
                exports: {
                    [`${name}SourceService`]: {
                        extends:    serviceEx?.type ? withPackageType(serviceEx) : `${name}BaseSourceService`,
                        implements: `I${name}SourceService`,
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/ServerSourceService/${name}SourceService.ts`),
                barrel,
            });
    });
};
