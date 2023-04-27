/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {WithIdentitySchema} from "@leight/source";
import {
	router,
	procedure
} from "../../router";
import {BankSourceSchema} from "@monye.one/bank";
import {BankSourceProcedure} from "@monye.one/bank-server";

export const BankSourceRouter = router({
    create: procedure
                .input(BankSourceSchema.ToCreateSchema)
                .mutation(BankSourceProcedure.handleCreate),
    patch:  procedure
                .input(BankSourceSchema.ToPatchSchema)
                .mutation(BankSourceProcedure.handlePatch),
    delete:  procedure
                .input(WithIdentitySchema)
                .mutation(BankSourceProcedure.handleDelete),
    deleteWith:  procedure
                .input(BankSourceSchema.QuerySchema)
                .mutation(BankSourceProcedure.handleDeleteWith),
    query:  procedure
                .input(BankSourceSchema.QueryOptionalSchema)
                .query(BankSourceProcedure.handleQuery),
    count:  procedure
                .input(BankSourceSchema.QueryOptionalSchema)
                .query(BankSourceProcedure.handleCount),
    fetch:  procedure
                .input(BankSourceSchema.QuerySchema)
                .query(BankSourceProcedure.handleFetch),
    find:   procedure
                .input(WithIdentitySchema)
                .query(BankSourceProcedure.handleFind),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_znf1zv114j3c745mmoqx02k1 = true;