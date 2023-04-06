import {type IPackageType}           from "@leight/generator";
import {withSourceFile}              from "@leight/generator-server";
import {normalize}                   from "node:path";
import {type IGenerator}             from "../../api";
import {type IGeneratorCommonParams} from "./generatorCommon";

export const generatorCommonSource: IGenerator<IGeneratorCommonParams> = async (
    {
        packageName,
        folder,
        barrel,
        params: {
                    entity,
                    sourceEx,
                }
    }) => {
    withSourceFile()
        .withImports({
            imports: {
                "@leight/source":    [
                    "type ISource",
                ],
                "@leight/container": [
                    "type IContainer",
                    "ServiceContext",
                ],
                "./SourceSchema":    [
                    `type I${entity}SourceSchema`,
                ],
            },
        })
        .withImports(sourceEx?.extends ? {
            imports: sourceEx.extends
                         .filter(((item): item is Required<IPackageType> => Boolean(item.package)))
                         .reduce((prev, {type, package: $package}) => ({
                             ...prev,
                             [$package]: [
                                 `type ${type}`,
                                 ...(prev[$package] || [])
                             ],
                         }), {} as Record<string, any>),
        } : undefined)
        .withInterfaces({
            exports: {
                [`I${entity}Source`]: {
                    extends: [
                                 {type: `ISource<I${entity}SourceSchema>`},
                             ].concat(sourceEx?.extends || []),
                },
            }
        })
        .withConsts({
            exports: {
                [`$${entity}Source`]: {body: `Symbol.for("${packageName}/I${entity}Source")`},
            }
        })
        .withConsts({
            exports: {
                [`${entity}SourceContext`]: {
                    body: `(container: IContainer) => new ServiceContext<I${entity}Source>(container, $${entity}Source)`,
                },
            },
        })
        .saveTo({
            file: normalize(`${process.cwd()}/${folder}/Source.ts`),
            barrel,
        });
};
