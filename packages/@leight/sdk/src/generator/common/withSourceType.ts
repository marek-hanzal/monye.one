import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IWithSourceTypeParams {
    sources: IWithSourceTypeParams.ISource[];
}

export namespace IWithSourceTypeParams {
    export interface ISource {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
    }
}

/**
 * Generates Query stuff bound to Prisma schemas.
 */
export const withSourceType: IGenerator<IWithSourceTypeParams> = async (
    {
        barrel,
        directory,
        params: {sources},
    }) => {
    for (const {name} of sources) {
        console.log(`- Generating [withSourceType] [${name}]`);

        withSourceFile()
            .withImports({
                imports: {
                    "../../schema": [
                        `type ${name}Source`,
                    ],
                },
            })
            .withTypes({
                exports: {
                    [`I${name}Source`]: `${name}Source["Type"]["Source"]`,
                },
            })
            .saveTo({
                file: normalize(`${directory}/source/I${name}Source.ts`),
                barrel,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "../../schema": [
                        `type ${name}Source`,
                    ],
                },
            })
            .withTypes({
                exports: {
                    [`Use${name}Repository`]: `${name}Source["Type"]["UseRepository"]`,
                },
            })
            .saveTo({
                file: normalize(`${directory}/repository/Use${name}Repository.ts`),
                barrel,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "../../schema": [
                        `type ${name}Source`,
                    ],
                },
            })
            .withTypes({
                exports: {
                    [`Use${name}RepositoryQuery`]: `${name}Source["Type"]["UseRepositoryQuery"]`,
                },
            })
            .saveTo({
                file: normalize(`${directory}/repository/Use${name}RepositoryQuery.ts`),
                barrel,
            });
    }
};
