import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorCommonSourceSchemaParams {
    entities: IGeneratorCommonSourceSchemaParams.IEntity[];
}

export namespace IGeneratorCommonSourceSchemaParams {
    export interface IEntity {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        withPrisma?: boolean;
    }
}

export const generatorCommonSourceSchema: IGenerator<IGeneratorCommonSourceSchemaParams> = async (
    {
        folder,
        barrel,
        params: {entities}
    }) => {
    const file = withSourceFile();

    entities.forEach(({name, withPrisma = false}) => {
        file.withHeader(`
    Source code of the common stuff for ${name} which could be shared between server and client side.
        `)
            .withImports({
                imports: {
                    "@leight/source":                                   [
                        "type IWithIdentity",
                        "type ISourceSchema"
                    ],
                    "@leight/react-query":                              [
                        "type IUseQuery",
                    ],
                    [withPrisma ? "./PrismaSchema" : "./EntitySchema"]: [
                        `type I${name}CreateSchema`,
                        `type I${name}FilterSchema`,
                        `type I${name}ParamSchema`,
                        `type I${name}PatchSchema`,
                        `type I${name}Schema`,
                        `type I${name}SortSchema`,
                    ]
                }
            })
            .withTypes({
                exports: {
                    [`IUse${name}Query`]:      `IUseQuery<I${name}SourceSchema["Query"] | undefined, I${name}SourceSchema["Entity"][]>`,
                    [`IUse${name}CountQuery`]: `IUseQuery<I${name}SourceSchema["Query"] | undefined, number>`,
                    [`IUse${name}FetchQuery`]: `IUseQuery<I${name}SourceSchema["Query"], I${name}SourceSchema["Entity"]>`,
                    [`IUse${name}FindQuery`]:  `IUseQuery<IWithIdentity, I${name}SourceSchema["Entity"]>`,
                }
            })
            .withInterfaces({
                exports: {
                    [`I${name}SourceSchema`]: {
                        extends: [
                            {
                                type: `
ISourceSchema<
    I${name}Schema,
    I${name}CreateSchema,
    I${name}PatchSchema,
    I${name}FilterSchema,
    I${name}SortSchema,
    I${name}ParamSchema
 >
                            `,
                            },
                        ],
                    }
                }
            });
    });

    file.saveTo({
        file: normalize(`${process.cwd()}/${folder}/SourceSchema.ts`),
        barrel,
    });
};
