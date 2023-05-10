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
import {TransactionSourceSchema} from "@monye.one/transaction";
import {TransactionRepositoryHandler} from "@monye.one/transaction-server";

export const TransactionRepositoryRouter = router({
    create: procedure
                .input(TransactionSourceSchema.ToCreateSchema)
                .mutation(TransactionRepositoryHandler.handleCreate),
    patch:  procedure
                .input(TransactionSourceSchema.ToPatchSchemaProps)
                .mutation(TransactionRepositoryHandler.handlePatch),
    patchBy:  procedure
                .input(TransactionSourceSchema.ToPatchBySchemaProps)
                .mutation(TransactionRepositoryHandler.handlePatchBy),
    upsert:  procedure
                .input(TransactionSourceSchema.ToUpsertSchemaProps)
                .mutation(TransactionRepositoryHandler.handleUpsert),
    delete:  procedure
                .input(TransactionSourceSchema.DeleteSchema)
                .mutation(TransactionRepositoryHandler.handleDelete),
    deleteBy:  procedure
                .input(TransactionSourceSchema.DeleteBySchema)
                .mutation(TransactionRepositoryHandler.handleDeleteBy),
    query:  procedure
                .input(TransactionSourceSchema.QuerySchema)
                .query(TransactionRepositoryHandler.handleQuery),
    count:  procedure
                .input(TransactionSourceSchema.CountSchema)
                .query(TransactionRepositoryHandler.handleCount),
    fetch:  procedure
                .input(TransactionSourceSchema.FetchSchema)
                .query(TransactionRepositoryHandler.handleFetch),
    fetch$:  procedure
                .input(TransactionSourceSchema.Fetch$Schema)
                .query(TransactionRepositoryHandler.handleFetch$),
    get:   procedure
                .input(WithIdentitySchema)
                .query(TransactionRepositoryHandler.handleGet),
    get$:   procedure
                .input(WithIdentity$Schema)
                .query(TransactionRepositoryHandler.handleGet$),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_o3u6itdn80vv0q28o71h2mgp = true;