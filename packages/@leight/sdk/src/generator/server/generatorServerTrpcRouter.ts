import {withSourceFile}     from "@leight/generator-server";
import {normalize}          from "node:path";
import {type IGenerator}    from "../../api";
import {generatorSdkBarrel} from "../generatorSdkBarrel";

export interface IGeneratorServerTrpcRouterParams {
    procedures: IGeneratorServerTrpcRouterParams.IProcedure[];
}

export namespace IGeneratorServerTrpcRouterParams {
    export interface IProcedure {
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
        procedure: string;
        router?: string;
    }
}

export const generatorServerTrpcRouter: IGenerator<IGeneratorServerTrpcRouterParams> = async (
    {
        packageName,
        folder,
        barrel,
        directory,
        params: {procedures},
    }) => {
    procedures.forEach(({name, packages}) => {
        withSourceFile()
            .withImports({
                imports: {
                    [packages.router || "../../router"]: [
                        "router",
                        "procedure",
                    ],
                }
            })
            .withImports({
                imports: {
                    [packages.procedure]: [
                        `${name}SourceProcedure`,
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`${name}SourceRouter`]: {
                        body: `
router({
    create: procedure
                .input(${name}SourceProcedure.CreateSchema)
                .mutation(${name}SourceProcedure.Create),
    patch:  procedure
                .input(${name}SourceProcedure.PatchSchema)
                .mutation(${name}SourceProcedure.Patch),
    query:  procedure
                .input(${name}SourceProcedure.QueryOptionalSchema)
                .query(${name}SourceProcedure.Query),
    count:  procedure
                .input(${name}SourceProcedure.QueryOptionalSchema)
                .query(${name}SourceProcedure.QueryCount),
    fetch:  procedure
                .input(${name}SourceProcedure.QuerySchema)
                .query(${name}SourceProcedure.Fetch),
    find:   procedure
                .input(${name}SourceProcedure.IdentitySchema)
                .query(${name}SourceProcedure.Find),
})
                    `,
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/ServerTrpc/${name}TrpcRouter.ts`),
                barrel,
            });
    });
    await generatorSdkBarrel({
        directory,
        barrel: true,
        packageName,
        folder,
        params: {},
    });
};
