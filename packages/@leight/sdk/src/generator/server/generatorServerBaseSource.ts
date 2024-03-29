import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorServerBaseSourceParams {
    entities: IGeneratorServerBaseSourceParams.IEntity[];
}

export namespace IGeneratorServerBaseSourceParams {
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

export const generatorServerBaseSource: IGenerator<IGeneratorServerBaseSourceParams> = async (
    {
        barrel,
        directory,
        params: {entities},
    }) => {
    entities.forEach(({name, packages}) => {
        withSourceFile()
            .withHeader(`
    Base Source contains default implementation of Source for entity ${name}. This could be used for further extensions,
    also default export uses this as a parent class.
        `)
            .withImports({
                imports: {
                    "@leight/source-server": [
                        "AbstractSource",
                    ],
                },
            })
            .withImports({
                imports: {
                    [packages.schema]: [
                        `$${name}Source`,
                        `type I${name}SourceSchemaType`,
                    ],
                }
            })
            .withClasses({
                exports: {
                    [`${name}BaseSource`]: {
                        extends: `AbstractSource<I${name}SourceSchemaType>`,
                        body:    `
    constructor() {
        super($${name}Source);
    }
                    `,
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/Source/${name}BaseSource.ts`),
                barrel,
            });
    });
};
