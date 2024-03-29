import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorFormParams {
    forms: IGeneratorFormParams.IForm[];
}

export namespace IGeneratorFormParams {
    export interface IForm {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        packages?: IPackages;
    }

    export interface IPackages {
        /**
         * Package used to import all schema-related types (ISource implementation, IWhere and so on, can be generated by @leight).
         */
        schema?: string;
    }
}

export const generatorForm: IGenerator<IGeneratorFormParams> = async (
    {
        directory,
        params: {forms}
    }) => {
    forms.forEach(({name, packages}) => {
        withSourceFile()
            .withImports({
                imports: {
                    "@leight/form":                                      [
                        "type IMantineFormContext",
                        "type IFormInputsFactory",
                    ],
                    [packages?.schema || `../../schema/${name}FormSchema`]: [
                        `type I${name}FormSchemaType`,
                    ],
                },
            })
            .withTypes({
                exports: {
                    [`I${name}MantineFormContext`]: `IMantineFormContext<I${name}FormSchemaType>`,
                    [`I${name}FormInputFactory`]:   `IFormInputsFactory<I${name}FormSchemaType>`,
                }
            })
            .saveTo({
                file:   normalize(`${directory}/api/${name}FormTypes.tsx`),
                barrel: false,
            });
    });
};
