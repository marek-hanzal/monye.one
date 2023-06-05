import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IWithRepositoryExParams {
    repositories: IWithRepositoryExParams.IRepository[];
}

export namespace IWithRepositoryExParams {
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
export const withRepositoryEx: IGenerator<IWithRepositoryExParams> = async (
    {
        barrel,
        directory,
        params: {repositories},
    }) => {
    for (const {
        name,
    } of repositories) {
        console.log(`- Generating [withRepositoryEx] [${name}]`);

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source":  [
                        "type IRepositorySchemaEx",
                    ],
                    "@leight/utils":  [
                        "z",
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`${name}RepositorySchemaEx`]: {
                        type: `I${name}RepositoryExSchema`,
                        body: `{
    WhereSchema:       z.object({}),
    WhereUniqueSchema: z.object({}),
    OrderBySchema:     z.object({}),
}
                    `
                    },
                },
            })
            .withTypes({
                exports: {
                    [`I${name}RepositorySchemaEx`]: `IRepositorySchemaEx<
    any,
    any,
    any
>`,
                    [`I${name}RepositoryExType`]:   `I${name}RepositorySchemaEx["Type"]`,
                    [`I${name}RepositoryExSchema`]: `I${name}RepositorySchemaEx["Schema"]`,
                },
            })
            .saveTo({
                file: normalize(`${directory}/schema/${name}RepositorySchemaEx.ts`),
                barrel,
            });
    }
};
