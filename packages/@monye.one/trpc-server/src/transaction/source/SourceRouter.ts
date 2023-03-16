import { TransactionQuerySchema } from "@monye.one/transaction";
import {
    TransactionQueryCountProcedure,
    TransactionQueryProcedure,
} from "@monye.one/transaction-server";
import { procedure, router } from "../../router";

export const SourceRouter = router({
    query: procedure
        .input(TransactionQuerySchema.optional())
        .query(TransactionQueryProcedure),
    count: procedure
        .input(TransactionQuerySchema.optional())
        .query(TransactionQueryCountProcedure),
});
