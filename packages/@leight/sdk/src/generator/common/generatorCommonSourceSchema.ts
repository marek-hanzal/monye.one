import {withSourceFile}              from "@leight/generator-server";
import {normalize}                   from "node:path";
import {type IGenerator}             from "../../api";
import {type IGeneratorCommonParams} from "../common";

export const generatorCommonSourceSchema: IGenerator<IGeneratorCommonParams> = async (
    {
        folder,
        barrel,
        params: {
                    entity,
                }
    }) => {
    withSourceFile()
        .withHeader(`
    Source code of the common stuff for ${entity} which could be shared between server and client side.
        `)
        .withImports({
            imports: {
                "@leight/source":      [
                    "type IWithIdentity",
                    "type ISourceSchema"
                ],
                "@leight/react-query": [
                    "type IUseQuery",
                ],
                ["./Schema"]:          [
                    `type I${entity}CreateSchema`,
                    `type I${entity}FilterSchema`,
                    `type I${entity}ParamSchema`,
                    `type I${entity}PatchSchema`,
                    `type I${entity}Schema`,
                    `type I${entity}SortSchema`,
                ]
            }
        })
        .withTypes({
            exports: {
                [`IUse${entity}Query`]:      `IUseQuery<I${entity}SourceSchema["Query"] | undefined, I${entity}SourceSchema["Entity"][]>`,
                [`IUse${entity}CountQuery`]: `IUseQuery<I${entity}SourceSchema["Query"] | undefined, number>`,
                [`IUse${entity}FetchQuery`]: `IUseQuery<I${entity}SourceSchema["Query"], I${entity}SourceSchema["Entity"]>`,
                [`IUse${entity}FindQuery`]:  `IUseQuery<IWithIdentity, I${entity}SourceSchema["Entity"]>`,
            }
        })
        .withInterfaces({
            exports: {
                [`I${entity}SourceSchema`]: {
                    extends: [
                        {
                            type: `
ISourceSchema<
    I${entity}Schema,
    I${entity}CreateSchema,
    I${entity}PatchSchema,
    I${entity}FilterSchema,
    I${entity}SortSchema,
    I${entity}ParamSchema
 >
                            `,
                        },
                    ],
                }
            }
        })
        .saveTo({
            file: normalize(`${process.cwd()}/${folder}/SourceSchema.ts`),
            barrel,
        });
};
