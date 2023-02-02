import {TransactionQueryProcedure} from "@monye.one/transaction-server";
import {procedure, router} from "../../router";

export const SourceRouter = router({
    query: procedure.query(TransactionQueryProcedure),
})
