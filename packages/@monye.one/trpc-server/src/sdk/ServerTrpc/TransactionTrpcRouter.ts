/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {WithIdentitySchema} from "@leight/source";
import {
	router,
	procedure
} from "../../router";
import {TransactionSourceSchema} from "@monye.one/transaction";
import {TransactionSourceProcedure} from "@monye.one/transaction-server";

export const TransactionSourceRouter = router({
    create: procedure
                .input(TransactionSourceSchema.ToCreateSchema)
                .mutation(TransactionSourceProcedure.handleCreate),
    patch:  procedure
                .input(TransactionSourceSchema.ToPatchSchema)
                .mutation(TransactionSourceProcedure.handlePatch),
    delete:  procedure
                .input(WithIdentitySchema)
                .mutation(TransactionSourceProcedure.handleDelete),
    deleteWith:  procedure
                .input(TransactionSourceSchema.QuerySchema)
                .mutation(TransactionSourceProcedure.handleDeleteWith),
    query:  procedure
                .input(TransactionSourceSchema.QueryOptionalSchema)
                .query(TransactionSourceProcedure.handleQuery),
    count:  procedure
                .input(TransactionSourceSchema.QueryOptionalSchema)
                .query(TransactionSourceProcedure.handleCount),
    fetch:  procedure
                .input(TransactionSourceSchema.QuerySchema)
                .query(TransactionSourceProcedure.handleFetch),
    find:   procedure
                .input(WithIdentitySchema)
                .query(TransactionSourceProcedure.handleFind),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_piml6f2g6y0z5denvwn1210k = true;