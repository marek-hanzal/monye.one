import {TransactionSourceProcedure} from "@monye.one/transaction-server";
import {
    procedure,
    router
}                                   from "../../router";

export const SourceRouter = router({
    create: procedure
                .input(TransactionSourceProcedure.CreateSchema)
                .mutation(TransactionSourceProcedure.Create),
    patch:  procedure
                .input(TransactionSourceProcedure.PatchSchema)
                .mutation(TransactionSourceProcedure.Patch),
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
