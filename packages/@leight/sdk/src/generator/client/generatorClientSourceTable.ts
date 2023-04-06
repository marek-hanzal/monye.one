import {withSourceFile}                    from "@leight/generator-server";
import {normalize}                         from "node:path";
import {type IGenerator}                   from "../../api";
import {type IGeneratorClientSourceParams} from "./generatorClientSource";

export const generatorClientSourceTable: IGenerator<IGeneratorClientSourceParams> = async (
    {
        folder,
        barrel,
        params: {
                    packages,
                    entity,
                }
    }) => {
    withSourceFile()
        .withImports({
            imports: {
                "@leight/table-client":   [
                    "SourceTable",
                    "type ISourceTableInternalProps",
                ],
                [packages.schema]:        [
                    `type I${entity}SourceSchema`,
                    `${entity}Schema`,
                ],
                "./ClientStore":          [
                    `${entity}SourceStore`,
                    `${entity}SortStore`,
                ],
                "./ClientSourceProvider": [
                    `${entity}Source`,
                ],
            }
        })
        .withInterfaces({
            exports: {
                [`I${entity}SourceTableInternalProps<TColumnKeys extends string>`]: {
                    extends: [
                        {type: `Omit<ISourceTableInternalProps<I${entity}SourceSchema, TColumnKeys>, "useSource" | "useSort" | "schema">`},
                    ],
                },
                [`I${entity}SourceTableProps<TColumnKeys extends string>`]:         {
                    extends: [
                        {type: `Omit<I${entity}SourceTableInternalProps<TColumnKeys>, "columns" | "withTranslation">`},
                    ],
                },
            },
        })
        .withConsts({
            exports: {
                [`${entity}SourceTable`]: {
                    body: `<TColumnKeys extends string>(props: I${entity}SourceTableInternalProps<TColumnKeys>) => {
    return <${entity}Source>
        <SourceTable
            useSource={${entity}SourceStore.useState}
            useSort={${entity}SortStore.useState}
            schema={${entity}Schema}
            {...props}
        />
    </${entity}Source>;
}
                    `,
                },
            },
        })
        .saveTo({
            file: normalize(`${process.cwd()}/${folder}/ClientSourceTable.tsx`),
            barrel,
        });
};
