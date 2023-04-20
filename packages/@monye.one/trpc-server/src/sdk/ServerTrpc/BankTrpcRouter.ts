/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	router,
	procedure
} from "../../router";
import {BankSourceProcedure} from "@monye.one/bank-server";

export const BankSourceRouter = router({
    create: procedure
                .input(BankSourceProcedure.CreateSchema)
                .mutation(BankSourceProcedure.Create),
    patch:  procedure
                .input(BankSourceProcedure.PatchSchema)
                .mutation(BankSourceProcedure.Patch),
    delete:  procedure
                .input(BankSourceProcedure.IdentitySchema)
                .mutation(BankSourceProcedure.Delete),
    deleteWith:  procedure
                .input(BankSourceProcedure.QuerySchema)
                .mutation(BankSourceProcedure.DeleteWith),
    query:  procedure
                .input(BankSourceProcedure.QueryOptionalSchema)
                .query(BankSourceProcedure.Query),
    count:  procedure
                .input(BankSourceProcedure.QueryOptionalSchema)
                .query(BankSourceProcedure.QueryCount),
    fetch:  procedure
                .input(BankSourceProcedure.QuerySchema)
                .query(BankSourceProcedure.Fetch),
    find:   procedure
                .input(BankSourceProcedure.IdentitySchema)
                .query(BankSourceProcedure.Find),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_dxsrdc8ollc503egogc10fk1 = true;