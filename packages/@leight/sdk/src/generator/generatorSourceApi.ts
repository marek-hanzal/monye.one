import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../api";

export interface IGeneratorSourceApiParams {
    /**
     * Model name being exported
     */
    modelName: string;
    /**
     * Package containing (generated) model interfaces (CreateSchema, FilterSchema, ...); maybe be written by hand
     *
     * Defaults to './entity-schema'
     */
    sdk?: string;
}

export const generatorSourceApi: IGenerator<IGeneratorSourceApiParams> = async ({packageName, file, barrel, params: {modelName, sdk = "./entity-schema"}}) => {
    withSourceFile()
        .withImports({
            imports: {
                "@leight/source": [
                    "type ISource",
                    "type ISourceSchema"
                ],
                [sdk]:            [
                    `type I${modelName}CreateSchema`,
                    `type I${modelName}FilterSchema`,
                    `type I${modelName}ParamSchema`,
                    `type I${modelName}PatchSchema`,
                    `type I${modelName}Schema`,
                    `type I${modelName}SortSchema`,
                ]
            }
        })
        .withInterfaces({
            exports: {
                [`I${modelName}Source`]:       {
                    extends: `ISource<I${modelName}SourceSchema>`,
                },
                [`I${modelName}SourceSchema`]: {
                    extends: `
ISourceSchema<
    I${modelName}Schema,
    I${modelName}CreateSchema,
    I${modelName}PatchSchema,
    I${modelName}FilterSchema,
    I${modelName}SortSchema,
    I${modelName}ParamSchema
 >
                    `
                }
            }
        })
        .withConsts({
            exports: {
                [`$${modelName}Source`]: {body: `Symbol.for("${packageName}/I${modelName}Source")`},
            }
        })
        .saveTo({
            file: normalize(`${process.cwd()}/${file}`),
            barrel,
        });
};
