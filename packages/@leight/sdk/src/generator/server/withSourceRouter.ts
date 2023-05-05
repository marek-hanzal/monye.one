import {withSourceFile}     from "@leight/generator-server";
import {normalize}          from "node:path";
import {type IGenerator}    from "../../api";
import {generatorSdkBarrel} from "../generatorSdkBarrel";

export interface IWithSourceRouterParams {
    procedures: IWithSourceRouterParams.IProcedure[];
}

export namespace IWithSourceRouterParams {
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

export const withSourceRouter: IGenerator<IWithSourceRouterParams> = async (
    {
        packageName,
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
    patchBy:  procedure
                .input(${name}SourceProcedure.PatchBySchema)
                .mutation(${name}SourceProcedure.handlePatchBy),
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
    fetchOptional:  procedure
                .input(${name}SourceProcedure.FetchSchema)
                .query(${name}SourceProcedure.handleFetchOptional),
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
                file: normalize(`${directory}/trpc/${name}SourceRouter.ts`),
                barrel,
            });
    });
    await generatorSdkBarrel({
        directory,
        barrel: true,
        packageName,
        params: {},
    });
};