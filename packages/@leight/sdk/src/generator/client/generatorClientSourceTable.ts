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
                    entities,
                }
    }) => {
    const file = withSourceFile();

    entities.forEach(({name: entity, disabled = []}) => {
        if (disabled.includes("table")) {
            return;
        }
        file.withImports({
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
                        comment: `
/**
 * Base implementation of a table providing ${entity} data already connected to a source; just extend this table with
 * columns and other props as you wish.
 */
                        `,
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
            });
    });

    file.saveTo({
        file: normalize(`${process.cwd()}/${folder}/ClientSourceTable.tsx`),
        barrel,
    });
};
