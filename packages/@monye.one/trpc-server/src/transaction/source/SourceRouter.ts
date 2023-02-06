import {TransactionQueryProcedure} from "@monye.one/transaction-server";
import {type IWithHandler} from "@leight/trpc-server";
import {type ITransactionEntity} from "@monye.one/transaction";
import {procedure, router} from "../../router";

export const SourceRouter = router({
    query: procedure.query(TransactionQueryProcedure as IWithHandler<void, ITransactionEntity[]>),
})
