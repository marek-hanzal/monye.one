/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	WithIdentitySchema,
	WithIdentity$Schema
} from "@leight/source";
import {
	router,
	procedure
} from "../../router";
import {BankSourceSchema} from "@monye.one/bank";
import {BankRepositoryHandler} from "@monye.one/bank-server";

export const BankRepositoryRouter = router({
    create: procedure
                .input(BankSourceSchema.ToCreateSchema)
                .mutation(BankRepositoryHandler.handleCreate),
    patch:  procedure
                .input(BankSourceSchema.ToPatchSchemaProps)
                .mutation(BankRepositoryHandler.handlePatch),
    patchBy:  procedure
                .input(BankSourceSchema.ToPatchBySchemaProps)
                .mutation(BankRepositoryHandler.handlePatchBy),
    upsert:  procedure
                .input(BankSourceSchema.ToUpsertSchemaProps)
                .mutation(BankRepositoryHandler.handleUpsert),
    delete:  procedure
                .input(BankSourceSchema.DeleteSchema)
                .mutation(BankRepositoryHandler.handleDelete),
    deleteBy:  procedure
                .input(BankSourceSchema.DeleteBySchema)
                .mutation(BankRepositoryHandler.handleDeleteBy),
    query:  procedure
                .input(BankSourceSchema.QuerySchema)
                .query(BankRepositoryHandler.handleQuery),
    count:  procedure
                .input(BankSourceSchema.CountSchema)
                .query(BankRepositoryHandler.handleCount),
    fetch:  procedure
                .input(BankSourceSchema.FetchSchema)
                .query(BankRepositoryHandler.handleFetch),
    fetch$:  procedure
                .input(BankSourceSchema.Fetch$Schema)
                .query(BankRepositoryHandler.handleFetch$),
    get:   procedure
                .input(WithIdentitySchema)
                .query(BankRepositoryHandler.handleGet),
    get$:   procedure
                .input(WithIdentity$Schema)
                .query(BankRepositoryHandler.handleGet$),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_xhdm3pwzzx5onwvgrv34j5zo = true;