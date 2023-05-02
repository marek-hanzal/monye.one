/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	router,
	procedure
} from "../../router";
import {TransactionSourceProcedure} from "@monye.one/transaction-server";

export const TransactionSourceRouter = router({
    create: procedure
                .input(TransactionSourceProcedure.CreateSchema)
                .mutation(TransactionSourceProcedure.handleCreate),
    patch:  procedure
                .input(TransactionSourceProcedure.PatchSchema)
                .mutation(TransactionSourceProcedure.handlePatch),
    upsert:  procedure
                .input(TransactionSourceProcedure.UpsertSchema)
                .mutation(TransactionSourceProcedure.handleUpsert),
    delete:  procedure
                .input(TransactionSourceProcedure.DeleteSchema)
                .mutation(TransactionSourceProcedure.handleDelete),
    deleteWith:  procedure
                .input(TransactionSourceProcedure.DeleteWithSchema)
                .mutation(TransactionSourceProcedure.handleDeleteWith),
    query:  procedure
                .input(TransactionSourceProcedure.QuerySchema)
                .query(TransactionSourceProcedure.handleQuery),
    count:  procedure
                .input(TransactionSourceProcedure.CountSchema)
                .query(TransactionSourceProcedure.handleCount),
    fetch:  procedure
                .input(TransactionSourceProcedure.FetchSchema)
                .query(TransactionSourceProcedure.handleFetch),
    fetchOptional:  procedure
                .input(TransactionSourceProcedure.FetchSchema)
                .query(TransactionSourceProcedure.handleFetchOptional),
    find:   procedure
                .input(TransactionSourceProcedure.FindSchema)
                .query(TransactionSourceProcedure.handleFind),
    findOptional:   procedure
                .input(TransactionSourceProcedure.FindOptionalSchema)
                .query(TransactionSourceProcedure.handleFindOptional),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_cq94smzyshpjx8frz78ufszu = true;