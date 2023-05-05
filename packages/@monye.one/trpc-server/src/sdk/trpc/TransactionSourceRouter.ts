/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	router,
	procedure
} from "../../router";
import {TransactionRepositoryHandler} from "@monye.one/transaction-server";

export const TransactionRepositoryRouter = router({
    create: procedure
                .input(TransactionSourceProcedure.CreateSchema)
                .mutation(TransactionSourceProcedure.handleCreate),
    patch:  procedure
                .input(TransactionSourceProcedure.PatchSchema)
                .mutation(TransactionSourceProcedure.handlePatch),
    patchBy:  procedure
                .input(TransactionSourceProcedure.PatchBySchema)
                .mutation(TransactionSourceProcedure.handlePatchBy),
    upsert:  procedure
                .input(TransactionSourceProcedure.UpsertSchema)
                .mutation(TransactionSourceProcedure.handleUpsert),
    delete:  procedure
                .input(TransactionSourceProcedure.DeleteSchema)
                .mutation(TransactionSourceProcedure.handleDelete),
    deleteBy:  procedure
                .input(TransactionSourceProcedure.DeleteBySchema)
                .mutation(TransactionSourceProcedure.handleDeleteBy),
    query:  procedure
                .input(TransactionSourceProcedure.QuerySchema)
                .query(TransactionSourceProcedure.handleQuery),
    count:  procedure
                .input(TransactionSourceProcedure.CountSchema)
                .query(TransactionSourceProcedure.handleCount),
    fetch:  procedure
                .input(TransactionSourceProcedure.FetchSchema)
                .query(TransactionSourceProcedure.handleFetch),
    fetch$:  procedure
                .input(TransactionSourceProcedure.Fetch$Schema)
                .query(TransactionSourceProcedure.handleFetchOptional),
    get:   procedure
                .input(WithIdentitySchema)
                .query(TransactionSourceProcedure.handleGet),
    get$:   procedure
                .input(WithIdentitySchema)
                .query(TransactionSourceProcedure.handleFindOptional),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_fz74up3nnupanzq38m6du9xf = true;