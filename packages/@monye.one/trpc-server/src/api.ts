import {BankRouter}        from "./bank";
import {ImportRouter}      from "./import";
import {JobRouter}         from "./job";
import {router}            from "./router";
import {TransactionRouter} from "./transaction";

export const api = router({
    import:      ImportRouter,
    job:         JobRouter,
    bank:        BankRouter,
    transaction: TransactionRouter,
});

export type IApi = typeof api;
