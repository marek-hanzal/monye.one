import {ImportRouter}      from "./import";
import {JobRouter}         from "./job";
import {router}            from "./router";
import {TransactionRouter} from "./transaction";

export const api = router({
    import:      ImportRouter,
    job:         JobRouter,
    transaction: TransactionRouter,
});

export type IApi = typeof api;
