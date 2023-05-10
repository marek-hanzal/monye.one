import {withSourceFile}     from "@leight/generator-server";
import {normalize}          from "node:path";
import {type IGenerator}    from "../../api";
import {generatorSdkBarrel} from "../generatorSdkBarrel";

export interface IWithRepositoryRouterParams {
    procedures: IWithRepositoryRouterParams.IProcedure[];
}

export namespace IWithRepositoryRouterParams {
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

export const withRepositoryRouter: IGenerator<IWithRepositoryRouterParams> = async (
    {
        packageName,
        barrel,
        directory,
        params: {procedures},
    }) => {
    procedures.forEach(({name, packages}) => {
        console.log(`- Generating [withRepositoryRouter] [${name}]`);

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source": [
                        "WithIdentitySchema",
                        "WithOptionalIdentitySchema",
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
                        `${name}RepositoryHandler`,
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`${name}RepositoryRouter`]: {
                        body: `
router({
    create: procedure
                .input(${name}SourceSchema.ToCreateSchema)
                .mutation(${name}RepositoryHandler.handleCreate),
    patch:  procedure
                .input(${name}SourceSchema.ToPatchSchemaProps)
                .mutation(${name}RepositoryHandler.handlePatch),
    patchBy:  procedure
                .input(${name}SourceSchema.ToPatchBySchemaProps)
                .mutation(${name}RepositoryHandler.handlePatchBy),
    upsert:  procedure
                .input(${name}SourceSchema.ToUpsertSchemaProps)
                .mutation(${name}RepositoryHandler.handleUpsert),
    delete:  procedure
                .input(${name}SourceSchema.DeleteSchema)
                .mutation(${name}RepositoryHandler.handleDelete),
    deleteBy:  procedure
                .input(${name}SourceSchema.DeleteBySchema)
                .mutation(${name}RepositoryHandler.handleDeleteBy),
    query:  procedure
                .input(${name}SourceSchema.QuerySchema)
                .query(${name}RepositoryHandler.handleQuery),
    count:  procedure
                .input(${name}SourceSchema.CountSchema)
                .query(${name}RepositoryHandler.handleCount),
    fetch:  procedure
                .input(${name}SourceSchema.FetchSchema)
                .query(${name}RepositoryHandler.handleFetch),
    fetch$:  procedure
                .input(${name}SourceSchema.Fetch$Schema)
                .query(${name}RepositoryHandler.handleFetch$),
    get:   procedure
                .input(WithIdentitySchema)
                .query(${name}RepositoryHandler.handleGet),
    get$:   procedure
                .input(WithOptionalIdentitySchema)
                .query(${name}RepositoryHandler.handleGet$),
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
