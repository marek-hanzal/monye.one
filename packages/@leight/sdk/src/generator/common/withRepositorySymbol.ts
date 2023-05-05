import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IWithRepositorySymbolParams {
    symbols: IWithRepositorySymbolParams.ISymbol[];
}

export namespace IWithRepositorySymbolParams {
    export interface ISymbol {
        name: string;
    }
}

export const withRepositorySymbol: IGenerator<IWithRepositorySymbolParams> = async (
    {
        packageName,
        directory,
        barrel,
        params: {symbols},
    }) => {
    symbols.forEach(({name}) => {
        withSourceFile()
            .withConsts({
                exports: {
                    [`$${name}Repository`]:        {body: `Symbol.for("${packageName}/I${name}Repository")`},
                    [`$${name}RepositoryMapper`]:  {body: `Symbol.for("${packageName}/I${name}RepositoryMapper")`},
                    [`$${name}RepositoryService`]: {body: `Symbol.for("${packageName}/I${name}RepositoryService")`},
                }
            })
            .saveTo({
                file: normalize(`${directory}/symbols/${name}Symbols.ts`),
                barrel,
            });
    });
};
