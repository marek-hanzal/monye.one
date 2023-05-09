import {withSourceFile} from "@leight/generator-server";
import {normalize} from "node:path";
import {type IGenerator} from "../../api";

export interface IWithRepositoryHandlerParams {
    repositories: IWithRepositoryHandlerParams.IRepository[];
}

export namespace IWithRepositoryHandlerParams {
    export interface IRepository {
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

export const withRepositoryHandler: IGenerator<IWithRepositoryHandlerParams> = async (
    {
        barrel,
        directory,
        params: {repositories},
    }) => {
    repositories.forEach(({name, packages}) => {
        console.log(`- Generating [withRepositoryHandler] [${name}]`);

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/trpc-source-server": [
                        "withRepositoryHandler",
                    ],
                }
            })
            .withImports({
                imports: {
                    [packages.schema]: [
                        `$${name}RepositoryService`,
                        `type ${name}Source`,
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`${name}RepositoryHandler`]: {
                        body: `
withRepositoryHandler<${name}Source["Schema"]["Service"]>({
    service: $${name}RepositoryService,
})
                    `,
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/handler/${name}RepositoryHandler.ts`),
                barrel,
            });
    });
};