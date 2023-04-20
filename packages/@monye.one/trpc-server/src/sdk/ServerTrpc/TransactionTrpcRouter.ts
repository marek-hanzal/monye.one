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
                .mutation(TransactionSourceProcedure.Create),
    patch:  procedure
                .input(TransactionSourceProcedure.PatchSchema)
                .mutation(TransactionSourceProcedure.Patch),
    delete:  procedure
                .input(TransactionSourceProcedure.IdentitySchema)
                .mutation(TransactionSourceProcedure.Delete),
    deleteWith:  procedure
                .input(TransactionSourceProcedure.QuerySchema)
                .mutation(TransactionSourceProcedure.DeleteWith),
    query:  procedure
                .input(TransactionSourceProcedure.QueryOptionalSchema)
                .query(TransactionSourceProcedure.Query),
    count:  procedure
                .input(TransactionSourceProcedure.QueryOptionalSchema)
                .query(TransactionSourceProcedure.QueryCount),
    fetch:  procedure
                .input(TransactionSourceProcedure.QuerySchema)
                .query(TransactionSourceProcedure.Fetch),
    find:   procedure
                .input(TransactionSourceProcedure.IdentitySchema)
                .query(TransactionSourceProcedure.Find),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_y9vfu2bl6pl46ssr5wmdvc7h = true;