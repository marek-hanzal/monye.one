import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorClientSourceStoreParams {
    entities: IGeneratorClientSourceStoreParams.IEntity[];
}

export namespace IGeneratorClientSourceStoreParams {
    export interface IEntity {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        /**
         * Required package imports
         */
        packages: IPackages;
    }

    export interface IPackages {
        /**
         * Package used to import all schema-related types (ISource implementation, IWhere and so on, can be generated by @leight).
         */
        schema: string;
    }
}

export const generatorClientSourceStore: IGenerator<IGeneratorClientSourceStoreParams> = async (
    {
        barrel,
        directory,
        params: {entities}
    }) => {
    entities.forEach(({name, packages}) => {
        withSourceFile()
            .withHeader(`
    Source code containing improved Zustand store stuff for Source support (client-side).
        `)
            .withImports({
                imports: {
                    "@leight/source-client": [
                        "withSourceStore",
                    ],
                    [packages.schema]:       [
                        `${name}SourceSchema`,
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`${name}SourceStore`]: {
                        body: `
withSourceStore({
    name: "${name}",
    SourceSchema: ${name}SourceSchema,
})
                    `,
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/ClientSource/${name}SourceStore.ts`),
                barrel,
            });
    });
};