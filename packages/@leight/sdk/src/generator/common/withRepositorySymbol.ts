import {IPackageType}    from "@leight/generator";
import {
    withPackageImport,
    withPackageType,
    withSourceFile
}                        from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IWithRepositorySymbolParams {
    repositories: IWithRepositorySymbolParams.ISymbol[];
}

export namespace IWithRepositorySymbolParams {
    export interface ISymbol {
        name: string;
        repositoryEx?: IPackageType;
        mapperEx?: IPackageType;
        serviceEx?: IPackageType;
    }
}

export const withRepositorySymbol: IGenerator<IWithRepositorySymbolParams> = async (
    {
        packageName,
        directory,
        barrel,
        params: {repositories},
    }) => {
    repositories.forEach((
        {
            name,
            repositoryEx,
            serviceEx,
            mapperEx
        }) => {
        console.log(`- Generating [withRepositorySymbol] [${name}]`);

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/container": [
                        "type IContainer",
                        "ServiceContext",
                    ],
                },
            })
            .withImports({
                imports: repositoryEx?.withPackage ? {
                    [repositoryEx.withPackage.package]: [
                        withPackageImport(repositoryEx),
                    ],
                } : {
                    [`../repository/I${name}Repository`]: [
                        `type I${name}Repository`,
                    ],
                },
            })
            .withImports({
                imports: serviceEx?.withPackage ? {
                    [serviceEx.withPackage.package]: [
                        withPackageImport(serviceEx),
                    ],
                } : {
                    [`../service/I${name}RepositoryService`]: [
                        `type I${name}RepositoryService`,
                    ],
                },
            })
            .withImports({
                imports: mapperEx?.withPackage ? {
                    [mapperEx.withPackage.package]: [
                        withPackageImport(mapperEx),
                    ],
                } : {
                    [`../mapper/I${name}RepositoryMapper`]: [
                        `type I${name}RepositoryMapper`,
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`$${name}Repository`]:              {body: `Symbol.for("${packageName}/I${name}Repository")`},
                    [`$${name}RepositoryMapper`]:        {body: `Symbol.for("${packageName}/I${name}RepositoryMapper")`},
                    [`$${name}RepositoryService`]:       {body: `Symbol.for("${packageName}/I${name}RepositoryService")`},
                    [`${name}RepositoryContext`]:        {body: `(container: IContainer) => new ServiceContext<${repositoryEx ? withPackageType(repositoryEx) : `I${name}Repository`}>(container, $${name}Repository)`},
                    [`${name}RepositoryMapperContext`]:  {body: `(container: IContainer) => new ServiceContext<${mapperEx ? withPackageType(mapperEx) : `I${name}RepositoryMapper`}>(container, $${name}RepositoryMapper)`},
                    [`${name}RepositoryServiceContext`]: {body: `(container: IContainer) => new ServiceContext<${serviceEx ? withPackageType(serviceEx) : `I${name}RepositoryService`}>(container, $${name}RepositoryService)`},
                }
            })
            .saveTo({
                file: normalize(`${directory}/symbol/${name}RepositorySymbol.ts`),
                barrel,
            });
    });
};
