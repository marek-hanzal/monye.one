import {withSourceFile}  from "@leight/generator-server";
import {Unboxed}         from "@leight/utils";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";
import {
    type IWithRepositoryExParams,
    withRepositoryEx
}                        from "./withRepositoryEx";
import {
    type IWithRepositoryMapperParams,
    withRepositoryMapper
}                        from "./withRepositoryMapper";
import {
    type IWithRepositorySymbolParams,
    withRepositorySymbol
}                        from "./withRepositorySymbol";

export interface IWithRepositoryParams {
    repositories: IWithRepositoryParams.IRepository[];
}

export namespace IWithRepositoryParams {
    export interface IRepository {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        withRepositoryEx?: Omit<Unboxed<IWithRepositoryExParams["repositories"]>, "name">;
        withRepositoryMapper?: Omit<Unboxed<IWithRepositoryMapperParams["repositories"]>, "name">;
        withRepositorySymbol?: Omit<Unboxed<IWithRepositorySymbolParams["repositories"]>, "name">;
    }
}

/**
 * Generates Query stuff bound to Prisma schemas.
 */
export const withRepository: IGenerator<IWithRepositoryParams> = async (
    {
        packageName,
        barrel,
        directory,
        params: {repositories},
    }) => {
    for (const {
        name,
        ...rest
    } of repositories) {
        console.log(`- Generating [withRepository] [${name}]`);

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source":               [
                        "type IRepository",
                    ],
                    [`../../schema/${name}Source`]: [
                        `type ${name}Source`,
                    ],
                },
            })
            .withInterfaces({
                exports: {
                    [`I${name}Repository`]: {
                        extends: [
                            {
                                type: `IRepository<${name}Source["Schema"]["Repository"]>`,
                            }
                        ]
                    }
                },
            })
            .saveTo({
                file: normalize(`${directory}/repository/I${name}Repository.ts`),
                barrel,
            });

        rest.withRepositoryEx && await withRepositoryEx({
            barrel,
            directory,
            packageName,
            params: {
                repositories: [
                    {
                        name,
                        ...rest.withRepositoryEx,
                    },
                ],
            },
        });
        rest.withRepositoryMapper && await withRepositoryMapper({
            barrel,
            directory,
            packageName,
            params: {
                repositories: [
                    {
                        name,
                        ...rest.withRepositoryMapper,
                    },
                ],
            },
        });
        rest.withRepositorySymbol && await withRepositorySymbol({
            barrel,
            directory,
            packageName,
            params: {
                repositories: [
                    {
                        name,
                        ...rest.withRepositorySymbol,
                    },
                ],
            },
        });
    }
};
