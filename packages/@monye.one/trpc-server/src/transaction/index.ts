import {TransactionSourceSchema} from "@monye.one/transaction";
import {SumByProcedure}          from "@monye.one/transaction-server";
import {
    procedure,
    router
}                                from "../router";
import {TransactionSourceRouter} from "../sdk";
import {ImportRouter}            from "./import";

export const TransactionRouter = router({
    source: TransactionSourceRouter,
    import: ImportRouter,
    sumBy:  procedure.input(TransactionSourceSchema.FilterSchema.optional()).query(SumByProcedure),
});
