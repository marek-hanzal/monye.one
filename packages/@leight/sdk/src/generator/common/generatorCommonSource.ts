import {IPackageType}    from "@leight/generator";
import {
    withPackageImport,
    withSourceFile
}                        from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorCommonSourceParams {
    entities: IGeneratorCommonSourceParams.IEntity[];
}

export namespace IGeneratorCommonSourceParams {
    export interface IEntity {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        withSourceEx?: IWithSourceEx;
    }

    export interface IWithSourceEx {
        extends?: IPackageType[];
    }
}

export const generatorCommonSource: IGenerator<IGeneratorCommonSourceParams> = async (
    {
        packageName,
        folder,
        barrel,
        params: {entities}
    }) => {
    const file = withSourceFile();

    entities.forEach(({name, withSourceEx}) => {
        file.withImports({
                imports: {
                    "@leight/source":    [
                        "type ISource",
                    ],
                    "@leight/container": [
                        "type IContainer",
                        "ServiceContext",
                    ],
                    "./SourceSchema":    [
                        `type I${name}SourceSchema`,
                    ],
                },
            })
            .withImports(withSourceEx?.extends ? {
                imports: withSourceEx.extends
                             .filter(((item): item is Required<IPackageType> => Boolean(item.withPackage)))
                             .reduce((prev, withPackage) => ({
                                 ...prev,
                                 [withPackage.withPackage.package]: [
                                     withPackageImport(withPackage, "type"),
                                     ...(prev[withPackage.withPackage.package] || [])
                                 ],
                             }), {} as Record<string, any>),
            } : undefined)
            .withInterfaces({
                exports: {
                    [`I${name}Source`]: {
                        extends: [
                                     {type: `ISource<I${name}SourceSchema>`},
                                 ].concat(withSourceEx?.extends || []),
                    },
                }
            })
            .withConsts({
                exports: {
                    [`$${name}Source`]: {body: `Symbol.for("${packageName}/I${name}Source")`},
                }
            })
            .withConsts({
                exports: {
                    [`${name}SourceContext`]: {
                        body: `(container: IContainer) => new ServiceContext<I${name}Source>(container, $${name}Source)`,
                    },
                },
            });
    });

    file.saveTo({
        file: normalize(`${process.cwd()}/${folder}/Source.ts`),
        barrel,
    });
};
