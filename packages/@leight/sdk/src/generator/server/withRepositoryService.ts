import {withSourceFile} from "@leight/generator-server";
import {normalize} from "node:path";
import {type IGenerator} from "../../api";

export interface IWithRepositoryServiceParams {
    repositories: IWithRepositoryServiceParams.IRepository[];
}

export namespace IWithRepositoryServiceParams {
    export interface IRepository {
        name: string;
        /**
         * Required package imports
         */
        packages: IPackages;
    }

    export interface IPackages {
        /**
         * Package used to import all schema-related types (IRepository implementation, IWhere and so on, can be generated by @leight).
         */
        schema: string;
    }

}

export const withRepositoryService: IGenerator<IWithRepositoryServiceParams> = async (
    {
        barrel,
        directory,
        params: {repositories},
    }) => {
    repositories.forEach(({name, packages}) => {
        console.log(`- Generating [withRepositoryService] [${name}]`);

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source-server": [
                        "AbstractRepositoryService",
                    ],
                    "@leight/source":        [
                        "type IRepositoryService",
                        "type IRepositoryMapper",
                        "type IRepository",
                    ],
                    [packages.schema]:       [
                        `$${name}Repository`,
                        `$${name}RepositoryMapper`,
                        `type ${name}Source`,
                    ],
                },
            })
            .withInterfaces({
                exports: {
                    [`I${name}RepositoryService`]: {
                        extends: [
                            {
                                type: `IRepositoryService<${name}Source["Schema"]["Service"]>`,
                            },
                        ],
                    },
                },
            })
            .withClasses({
                exports: {
                    [`Base${name}RepositoryService<
    TServiceSchema extends ${name}Source["Schema"]["Service"] = ${name}Source["Schema"]["Service"]
>`]: {
                        implements: `I${name}RepositoryService`,
                        extends:    `AbstractRepositoryService<TServiceSchema>`,
                        body:       `
static inject = [
        $${name}Repository,
        $${name}RepositoryMapper,
    ];
    
    constructor(
        protected $repository: IRepository<TServiceSchema>,
        protected $mapper: IRepositoryMapper<TServiceSchema>,
    ) {
        super();
    }

    mapper(): IRepositoryMapper<TServiceSchema> {
        return this.$mapper;
    }
    
    repository(): IRepository<TServiceSchema> {
        return this.$repository;
    }
`
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/service/Base${name}RepositoryService.ts`),
                barrel,
            });
    });
};
