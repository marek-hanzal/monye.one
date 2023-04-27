import {type IPackageType} from "@leight/generator";
import {withSourceFile}    from "@leight/generator-server";
import {normalize}         from "node:path";
import {type IGenerator}   from "../../api";

export interface IGeneratorCommonEntitySourceParams {
    entities: IGeneratorCommonEntitySourceParams.IEntity[];
}

export namespace IGeneratorCommonEntitySourceParams {
    export interface IEntity {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
    }

    export interface IWithSourceEx {
        extends?: IPackageType[];
    }

    export interface IWithSchemaEx {
        /**
         * Optional extension of entity schema
         */
        schema: IPackageType;
        dto?: IPackageType;
        create?: IPackageType;
        toCreate?: IPackageType;
        patch?: IPackageType;
        toPatch?: IPackageType;
        filter?: IPackageType;
        params?: IPackageType;
    }
}

/**
 * Generates Query stuff bound to Prisma schemas.
 */
export const generatorCommonEntitySource: IGenerator<IGeneratorCommonEntitySourceParams> = async (
    {
        packageName,
        barrel,
        directory,
        params: {entities},
    }) => {
    entities.forEach(({name}) => {
        withSourceFile()
            .withImports({
                imports: {
                    [`../schema/${name}SourceSchema`]: [
                        `type I${name}SourceSchemaType`,
                    ],
                    "@leight/source":                  [
                        "type ISourceMapper",
                    ],
                },
            })
            .withTypes({
                exports: {
                    [`I${name}SourceMapper`]: `ISourceMapper<I${name}SourceSchemaType>`,
                },
            })
            .saveTo({
                file:   normalize(`${directory}/api/${name}Types.ts`),
                barrel: false,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source":                  [
                        "type ISource",
                        "type IUseSourceQuery",
                    ],
                    [`../schema/${name}SourceSchema`]: [
                        `type I${name}SourceSchemaType`,
                    ],
                },
            })
            .withInterfaces({
                exports: {
                    [`I${name}Source`]: {
                        extends: [
                            {type: `ISource<I${name}SourceSchemaType>`},
                        ],
                    },
                }
            })
            .withTypes({
                exports: {
                    [`IUse${name}SourceQuery`]: `IUseSourceQuery<I${name}SourceSchemaType>`,
                }
            })
            .withConsts({
                exports: {
                    [`$${name}Source`]:        {body: `Symbol.for("${packageName}/I${name}Source")`},
                    [`$${name}SourceMapper`]:  {body: `Symbol.for("${packageName}/I${name}SourceMapper")`},
                    [`$${name}SourceService`]: {body: `Symbol.for("${packageName}/I${name}SourceService")`},
                }
            })
            .saveTo({
                file: normalize(`${directory}/Source/${name}Source.ts`),
                barrel,
            });
    });
};
