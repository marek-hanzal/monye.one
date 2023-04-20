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
                    "@leight/source": [
                        "WithIdentitySchema",
                    ],
                },
            })
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
                    [packages.schema]: [
                        `${name}SourceSchema`,
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
                .input(${name}SourceSchema.ToCreateSchema)
                .mutation(${name}SourceProcedure.handleCreate),
    patch:  procedure
                .input(${name}SourceSchema.ToPatchSchema)
                .mutation(${name}SourceProcedure.handlePatch),
    delete:  procedure
                .input(WithIdentitySchema)
                .mutation(${name}SourceProcedure.handleDelete),
    deleteWith:  procedure
                .input(${name}SourceSchema.QuerySchema)
                .mutation(${name}SourceProcedure.handleDeleteWith),
    query:  procedure
                .input(${name}SourceSchema.QuerySchema)
                .query(${name}SourceProcedure.handleQuery),
    count:  procedure
                .input(${name}SourceSchema.QuerySchema)
                .query(${name}SourceProcedure.handleCount),
    fetch:  procedure
                .input(${name}SourceSchema.QuerySchema)
                .query(${name}SourceProcedure.handleFetch),
    find:   procedure
                .input(WithIdentitySchema)
                .query(${name}SourceProcedure.handleFind),
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
