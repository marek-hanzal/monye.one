import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IWithSelectionParams {
    selections: IWithSelectionParams.ISelection[];
}

export namespace IWithSelectionParams {
    export interface ISelection {
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

export const withSelection: IGenerator<IWithSelectionParams> = async (
    {
        barrel,
        directory,
        params: {selections}
    }) => {
    selections.forEach(({
                            name,
                            packages
                        }) => {
        console.log(`- Generating [withSelection] [${name}]`);

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
                        `type I${name}SourceType as SourceType`,
                    ],
                }
            })
            .withTypes({
                exports: {
                    [`I${name}SelectionStore`]: `
IStoreContext<ISelectionStoreProps<SourceType["Dto"]>>
                    `,
                },
            })
            .withConsts({
                exports: {
                    [`${name}Selection`]: {
                        body: `
createSelectionStore<SourceType["Dto"]>({name: "${name}"})
                        `,
                    }
                },
            })
            .saveTo({
                file: normalize(`${directory}/selection/${name}Selection.tsx`),
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
                        `type I${name}SourceType as SourceType`,
                    ],
                }
            })
            .withTypes({
                exports: {
                    [`I${name}MultiSelectionStore`]: `
IStoreContext<IMultiSelectionStoreProps<SourceType["Dto"]>>
                    `,
                },
            })
            .withConsts({
                exports: {
                    [`${name}MultiSelection`]: {
                        body: `
createMultiSelectionStore<SourceType["Dto"]>({name: "${name}"})
                        `,
                    }
                },
            })
            .saveTo({
                file: normalize(`${directory}/selection/${name}MultiSelection.tsx`),
                barrel,
            });
    });
};
