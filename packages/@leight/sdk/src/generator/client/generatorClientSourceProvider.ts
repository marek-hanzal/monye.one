import {withSourceFile}                    from "@leight/generator-server";
import {normalize}                         from "node:path";
import {type IGenerator}                   from "../../api";
import {type IGeneratorClientSourceParams} from "./generatorClientSource";

export const generatorClientSourceProvider: IGenerator<IGeneratorClientSourceParams> = async (
    {
        folder,
        barrel,
        params: {
                    packages,
                    entity,
                    trpc,
                }
    }) => {
    withSourceFile()
        .withImports({
            imports: {
                "@leight/source-client": [
                    "type ISourceProps",
                    "Source",
                ],
                "@leight/query-client":  [
                    "type IQueryProviderProps",
                    "QueryProvider",
                ],
                [packages.schema]:       [
                    `type I${entity}SourceSchema`,
                    `${entity}Schema`,
                ],
                "react":                 [
                    "type FC",
                ],
                "./ClientStore":         [
                    `${entity}SourceStore`,
                    `${entity}SortStore`,
                ]
            }
        })
        .withImports(trpc ? undefined : {
            imports: {
                [packages.schema]: [
                    `type IUse${entity}Query`,
                    `type IUse${entity}CountQuery`,
                ],
            },
        })
        .withImports(trpc ? {
            imports: {
                [trpc.package]: [
                    "trpc",
                ],
            },
        } : undefined)
        .withInterfaces({
            exports: {
                [`I${entity}SourceProps`]:        {
                    extends: [
                        {type: `ISourceProps<I${entity}SourceSchema>`},
                    ],
                    body:    trpc ? undefined : `
useSourceQuery: IUse${entity}Query;
                    `,
                },
                [`I${entity}QueryProviderProps`]: {
                    extends: [
                        {type: `IQueryProviderProps<I${entity}SourceSchema>`},
                    ],
                    body:    trpc ? undefined : `
useCountQuery: IUse${entity}CountQuery;
                    `,
                },
            },
        })
        .withConsts({
            exports: {
                [`${entity}Source`]:        {
                    type: `FC<I${entity}SourceProps>`,
                    body: `props => {
    return <Source<I${entity}SourceSchema>
        schema={${entity}Schema}
        SourceProvider={${entity}SourceStore.Provider}
        useSortState={${entity}SortStore.useState}
        ${trpc ? `useSourceQuery={trpc.${trpc.path}.source.query.useQuery}\n\t\t` : "\t\t"}{...props}
    />;
}
                    `,
                },
                [`${entity}QueryProvider`]: {
                    type: `FC<I${entity}QueryProviderProps>`,
                    body: `props => {
    return <QueryProvider<I${entity}SourceSchema>
        SortProvider={${entity}SortStore.Provider}
        ${trpc ? `useCountQuery={trpc.${trpc.path}.source.count.useQuery}\n\t\t` : "\t\t"}{...props}
    />;
}
                    `,
                },
            },
        })
        .saveTo({
            file: normalize(`${process.cwd()}/${folder}/ClientSourceProvider.tsx`),
            barrel,
        });
};
