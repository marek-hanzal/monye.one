import {TransactionSourceSchema}     from "@monye.one/transaction";
import {SumByHandler}                from "@monye.one/transaction-server";
import {
    procedure,
    router
}                                    from "../router";
import {TransactionRepositoryRouter} from "../sdk";
import {ImportRouter}                from "./import";

export const TransactionRouter = router({
    repository: TransactionRepositoryRouter,
    import:     ImportRouter,
    sumBy:      procedure.input(TransactionSourceSchema.FilterSchema.optional()).query(SumByHandler),
});
