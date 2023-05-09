import {withSourceFile} from "@leight/generator-server";
import {normalize} from "node:path";
import {type IGenerator} from "../../api";

export interface IWithRepositoryMapperParams {
    repositories: IWithRepositoryMapperParams.IRepository[];
}

export namespace IWithRepositoryMapperParams {
    export interface IRepository {
        name: string;
    }
}

export const withRepositoryMapper: IGenerator<IWithRepositoryMapperParams> = async (
    {
        barrel,
        directory,
        params: {repositories},
    }) => {
    repositories.forEach(({name}) => {
        console.log(`- Generating [withRepositoryMapper] [${name}]`);

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source": [
                        `type IRepositoryMapper`,
                    ],
                    ["../../schema"]: [
                        `type ${name}Source`,
                    ],
                },
            })
            .withInterfaces({
                exports: {
                    [`I${name}RepositoryMapper`]: {
                        extends: [
                            {
                                type: `IRepositoryMapper<${name}Source["Schema"]["Mapper"]>`,
                            },
                        ],
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/mapper/I${name}RepositoryMapper.ts`),
                barrel,
            });
    });
};
