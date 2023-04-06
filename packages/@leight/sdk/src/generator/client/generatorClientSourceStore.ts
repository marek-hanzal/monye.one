import {withSourceFile}                    from "@leight/generator-server";
import {normalize}                         from "node:path";
import {type IGenerator}                   from "../../api";
import {type IGeneratorClientSourceParams} from "./generatorClientSource";

export const generatorClientSourceStore: IGenerator<IGeneratorClientSourceParams> = async (
    {
        folder,
        barrel,
        params: {
                    packages,
                    entity,
                }
    }) => {
    withSourceFile()
        .withHeader(`
    Source code containing improved Zustand store stuff for Source support (client-side).
        `)
        .withImports({
            imports: {
                "@leight/source-client": [
                    "createSourceContext",
                    "type ISourceProps",
                ],
                "@leight/sort-client":   [
                    "createSortContext",
                ],
                [packages.schema]:       [
                    `type I${entity}SourceSchema`,
                    `${entity}Schema`,
                    `type I${entity}SortSchema`,
                    `${entity}SortSchema`,
                ],
            },
        })
        .withTypes({
            exports: {
                [`I${entity}Source`]: `ISourceProps<I${entity}SourceSchema>`,
            },
        })
        .withConsts({
            exports: {
                [`${entity}SourceStore`]: {
                    body: `
createSourceContext<I${entity}SourceSchema>({
    name:   "${entity}",
    schema: ${entity}Schema,
})
                    `,
                },
                [`${entity}SortStore`]:   {
                    body: `
createSortContext<I${entity}SortSchema>({
    name:   "${entity}Sort",
    schema: ${entity}SortSchema,
})
                    `,
                },
            },
        })
        .saveTo({
            file: normalize(`${process.cwd()}/${folder}/ClientStore.ts`),
            barrel,
        });
};
