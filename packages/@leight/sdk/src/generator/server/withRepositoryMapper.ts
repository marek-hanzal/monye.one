import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IWithRepositoryMapperParams {
    repositories: IWithRepositoryMapperParams.IRepository[];
}

export namespace IWithRepositoryMapperParams {
    export interface IRepository {
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

export const withRepositoryMapper: IGenerator<IWithRepositoryMapperParams> = async (
    {
        barrel,
        directory,
        params: {repositories},
    }) => {
    repositories.forEach(({name, packages}) => {
        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source-server": [
                        `AbstractRepositoryMapper`,
                    ],
                    [packages.schema]:       [
                        `type FilterSource`,
                    ],
                },
            })
            .withClasses({
                exports: {
                    [`Base${name}RepositoryMapper`]: {
                        extends: `AbstractRepositoryMapper<${name}Source["Schema"]["Mapper"]>`,
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/mapper/Base${name}RepositoryMapper.ts`),
                barrel,
            });
    });
};
