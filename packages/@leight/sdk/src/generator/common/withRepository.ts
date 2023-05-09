import {withSourceFile} from "@leight/generator-server";
import {normalize} from "node:path";
import {type IGenerator} from "../../api";

export interface IWithRepositoryParams {
    repositories: IWithRepositoryParams.IRepository[];
}

export namespace IWithRepositoryParams {
    export interface IRepository {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
    }
}

/**
 * Generates Query stuff bound to Prisma schemas.
 */
export const withRepository: IGenerator<IWithRepositoryParams> = async (
    {
        barrel,
        directory,
        params: {repositories},
    }) => {
    for (const {name} of repositories) {
        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source": [
                        "type IRepository",
                    ],
                    '../../schema': [
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
    }
};
