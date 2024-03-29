import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorClientSelectionParams {
    selections: IGeneratorClientSelectionParams.IForm[];
}

export namespace IGeneratorClientSelectionParams {
    export interface IForm {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        packages: IPackages;
    }

    export interface IPackages {
        /**
         * Package used to import all schema-related types (ISource implementation, IWhere and so on, can be generated by @leight).
         */
        schema: string;
    }
}

export const generatorClientSelection: IGenerator<IGeneratorClientSelectionParams> = async (
    {
        barrel,
        directory,
        params: {selections}
    }) => {
    selections.forEach(({name, packages}) => {
        withSourceFile()
            .withImports({
                imports: {
                    "@leight/selection-client": [
                        "createSelectionStore",
                    ],
                    "@leight/context":          [
                        "type IStoreContext",
                    ],
                    "@leight/selection":        [
                        "type ISelectionStoreProps",
                    ],
                },
            })
            .withImports({
                imports: {
                    [packages.schema]: [
                        `type I${name}SourceSchemaType`,
                    ],
                }
            })
            .withTypes({
                exports: {
                    [`I${name}SelectionStore`]: `
IStoreContext<ISelectionStoreProps<I${name}SourceSchemaType["Dto"]>>
                    `,
                },
            })
            .withConsts({
                exports: {
                    [`${name}Selection`]: {
                        body: `
createSelectionStore<I${name}SourceSchemaType["Dto"]>({name: "${name}"})
                        `,
                    }
                },
            })
            .saveTo({
                file: normalize(`${directory}/Selection/${name}Selection.tsx`),
                barrel,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/selection-client": [
                        "createMultiSelectionStore",
                    ],
                    "@leight/context":          [
                        "type IStoreContext",
                    ],
                    "@leight/selection":        [
                        "type IMultiSelectionStoreProps",
                    ],
                },
            })
            .withImports({
                imports: {
                    [packages.schema]: [
                        `type I${name}SourceSchemaType`,
                    ],
                }
            })
            .withTypes({
                exports: {
                    [`I${name}MultiSelectionStore`]: `
IStoreContext<IMultiSelectionStoreProps<I${name}SourceSchemaType["Dto"]>>
                    `,
                },
            })
            .withConsts({
                exports: {
                    [`${name}MultiSelection`]: {
                        body: `
createMultiSelectionStore<I${name}SourceSchemaType["Dto"]>({name: "${name}"})
                        `,
                    }
                },
            })
            .saveTo({
                file: normalize(`${directory}/Selection/${name}MultiSelection.tsx`),
                barrel,
            });
    });
};
