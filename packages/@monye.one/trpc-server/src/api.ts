import {ImportRouter}      from "./import";
import {router}            from "./router";
import {TransactionRouter} from "./transaction";

export const api = router({
    import:      ImportRouter,
    transaction: TransactionRouter,
});

export type IApi = typeof api;
