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
        schema: string;
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
                },
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
                .mutation(${name}SourceProcedure.handleCreate),
    patch:  procedure
                .input(${name}SourceProcedure.PatchSchema)
                .mutation(${name}SourceProcedure.handlePatch),
    upsert:  procedure
                .input(${name}SourceProcedure.UpsertSchema)
                .mutation(${name}SourceProcedure.handleUpsert),
    delete:  procedure
                .input(${name}SourceProcedure.DeleteSchema)
                .mutation(${name}SourceProcedure.handleDelete),
    deleteWith:  procedure
                .input(${name}SourceProcedure.DeleteWithSchema)
                .mutation(${name}SourceProcedure.handleDeleteWith),
    query:  procedure
                .input(${name}SourceProcedure.QuerySchema)
                .query(${name}SourceProcedure.handleQuery),
    count:  procedure
                .input(${name}SourceProcedure.CountSchema)
                .query(${name}SourceProcedure.handleCount),
    fetch:  procedure
                .input(${name}SourceProcedure.FetchSchema)
                .query(${name}SourceProcedure.handleFetch),
    find:   procedure
                .input(${name}SourceProcedure.FindSchema)
                .query(${name}SourceProcedure.handleFind),
    findOptional:   procedure
                .input(${name}SourceProcedure.FindOptionalSchema)
                .query(${name}SourceProcedure.handleFindOptional),
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
