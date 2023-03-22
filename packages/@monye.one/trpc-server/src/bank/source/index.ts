import {BankSourceProcedure} from "@monye.one/bank-server";
import {
    procedure,
    router
}                            from "../../router";

export const SourceRouter = router({
    query: procedure
               .input(BankSourceProcedure.QueryOptionalSchema)
               .query(BankSourceProcedure.Query),
    count: procedure
               .input(BankSourceProcedure.QueryOptionalSchema)
               .query(BankSourceProcedure.QueryCount),
    fetch: procedure
               .input(BankSourceProcedure.QuerySchema)
               .query(BankSourceProcedure.Fetch),
    find:  procedure
               .input(BankSourceProcedure.IdentitySchema)
               .query(BankSourceProcedure.Find),
});
