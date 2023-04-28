import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorClientFilterFormParams {
    forms: IGeneratorClientFilterFormParams.IForm[];
}

export namespace IGeneratorClientFilterFormParams {
    export interface IForm {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        translation: {
            namespace: string;
        };
        packages: IPackages;
    }

    export interface IPackages {
        /**
         * Package used to import all schema-related types (ISource implementation, IWhere and so on, can be generated by @leight).
         */
        schema: string;
    }
}

export const generatorClientFilterForm: IGenerator<IGeneratorClientFilterFormParams> = async (
    {
        barrel,
        directory,
        params: {forms}
    }) => {
    forms.forEach(({name, translation, packages}) => {
        withSourceFile()
            .withImports({
                imports: {
                    "@leight/form-client": [
                        "createFormContext",
                    ],
                    [packages.schema]:     [
                        `type I${name}FilterFormSchemaType`,
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`${name}FilterFormStoreContext`]: {
                        body: `
createFormContext<I${name}FilterFormSchemaType>({
    name: "${name}FilterForm",
})
                        `,
                    },
                }
            })
            .saveTo({
                file:   normalize(`${directory}/FormStoreContext/${name}FilterFormStoreContext.tsx`),
                barrel: false,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/form-client": [
                        "createMantineFormContext",
                    ],
                    [packages.schema]:     [
                        `type I${name}FilterFormSchemaType`,
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`${name}MantineFilterFormContext`]: {
                        body: `createMantineFormContext<I${name}FilterFormSchemaType>()`,
                    },
                },
            })
            .saveTo({
                file:   normalize(`${directory}/FormStoreContext/${name}MantineFilterFormContext.tsx`),
                barrel: false,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/form-client":                           [
                        "type IWithInputProps",
                        "WithInput",
                    ],
                    [packages.schema]:                               [
                        `type I${name}FilterFormSchemaType`,
                    ],
                    "react":                                         [
                        "type FC",
                    ],
                    [`../FormStoreContext/${name}FilterFormStoreContext`]: [
                        `${name}FilterFormStoreContext`,
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`${name}FilterInput`]: {
                        type: `FC<Omit<IWithInputProps<I${name}FilterFormSchemaType>, "FormContext">>`,
                        body: `
props => {
    return <WithInput
        FormContext={${name}FilterFormStoreContext}
        {...props}
    />;
}
                            `,
                    },
                },
            })
            .saveTo({
                file:   normalize(`${directory}/FilterForm/${name}FilterInput.tsx`),
                barrel: false,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/filter-client":                           [
                        "BaseFilterForm",
                        "type IBaseFilterFormProps",
                    ],
                    "react":                                           [
                        "type FC",
                    ],
                    [packages.schema]:                                 [
                        `type I${name}FilterFormSchemaType`,
                        `type I${name}SourceSchemaType`,
                    ],
                    [`../FormStoreContext/${name}FilterFormStoreContext`]:   [
                        `${name}FilterFormStoreContext`,
                    ],
                    [`../FormStoreContext/${name}MantineFilterFormContext`]: [
                        `${name}MantineFilterFormContext`,
                    ],
                    [`../Source/${name}SourceStore`]:                  [
                        `${name}SourceStore`,
                    ],
                },
            })
            .withImports({
                imports: {
                    [packages.schema]: [
                        `${name}FilterFormSchema`,
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`${name}BaseFilterForm`]: {
                        type: `FC<I${name}BaseFilterFormProps>`,
                        // language=text
                        body: `
props => {
    return <BaseFilterForm<I${name}FilterFormSchemaType, I${name}SourceSchemaType>
        SourceStore={${name}SourceStore}
        MantineContext={${name}MantineFilterFormContext}
        schemas={${name}FilterFormSchema}
        FormContext={${name}FilterFormStoreContext}
        withTranslation={{
            namespace: "${translation.namespace}",
            label:     "${name}BaseFilterForm",
        }}
        {...props}
    />;
}
                        `,
                    },
                },
            })
            .withInterfaces({
                exports: {
                    [`I${name}BaseFilterFormProps`]: {
                        extends: [
                            {
                                type: `Omit<IBaseFilterFormProps<I${name}FilterFormSchemaType, I${name}SourceSchemaType>, "SourceStore" | "FormContext" | "MantineContext" | "withTranslation">`,
                            },
                        ],
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/FilterForm/${name}BaseFilterForm.tsx`),
                barrel,
            });
    });
};
