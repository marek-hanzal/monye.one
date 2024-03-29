import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorClientSourceSelectParams {
    selects: IGeneratorClientSourceSelectParams.IForm[];
}

export namespace IGeneratorClientSourceSelectParams {
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

export const generatorClientSourceSelect: IGenerator<IGeneratorClientSourceSelectParams> = async (
    {
        barrel,
        directory,
        params: {selects}
    }) => {
    selects.forEach(({name, packages}) => {
        withSourceFile()
            .withImports({
                imports: {
                    "@leight/form":                    [
                        "type IFormSchemaType",
                    ],
                    "@leight/form-client":             [
                        "type ISourceSelectProps",
                        "SourceSelect",
                    ],
                    [`../Selection/${name}Selection`]: [
                        `${name}Selection`,
                    ],
                    [`../Source/${name}SourceStore`]: [
                        `${name}SourceStore`,
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
            .withInterfaces({
                exports: {
                    [`I${name}SourceSelect<TFormSchemaType extends IFormSchemaType>`]: {
                        extends: [
                            {
                                type: `Omit<ISourceSelectProps<TFormSchemaType, I${name}SourceSchemaType>, "SelectionContext" | "SourceStore">`,
                            }
                        ],
                    }
                },
            })
            .withConsts({
                exports: {
                    [`${name}SourceSelect`]: {
                        body: `
<TFormSchemaType extends IFormSchemaType>(props: I${name}SourceSelect<TFormSchemaType>) => {
    return <SourceSelect<TFormSchemaType, I${name}SourceSchemaType>
        SelectionContext={${name}Selection}
        SourceStore={${name}SourceStore}
        {...props}
    />;
}
                        `,
                    }
                },
            })
            .saveTo({
                file: normalize(`${directory}/SourceSelect/${name}SourceSelect.tsx`),
                barrel,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/form":                    [
                        "type IFormSchemaType",
                    ],
                    "@leight/form-client":             [
                        "type ISourceMultiSelectProps",
                        "SourceMultiSelect",
                    ],
                    [`../Selection/${name}MultiSelection`]: [
                        `${name}MultiSelection`,
                    ],
                    [`../Source/${name}SourceStore`]: [
                        `${name}SourceStore`,
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
            .withInterfaces({
                exports: {
                    [`I${name}MultiSourceSelect<TFormSchemaType extends IFormSchemaType>`]: {
                        extends: [
                            {
                                type: `Omit<ISourceMultiSelectProps<TFormSchemaType, I${name}SourceSchemaType>, "SelectionContext" | "SourceStore">`,
                            }
                        ],
                    }
                },
            })
            .withConsts({
                exports: {
                    [`${name}MultiSourceSelect`]: {
                        body: `
<TFormSchemaType extends IFormSchemaType>(props: I${name}MultiSourceSelect<TFormSchemaType>) => {
    return <SourceMultiSelect<TFormSchemaType, I${name}SourceSchemaType>
        SelectionContext={${name}MultiSelection}
        SourceStore={${name}SourceStore}
        {...props}
    />
}
                        `,
                    }
                },
            })
            .saveTo({
                file: normalize(`${directory}/SourceSelect/${name}SourceMultiSelect.tsx`),
                barrel,
            });
    });
};
