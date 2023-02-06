import {router} from "./router";
import {TransactionRouter} from "./transaction";
import {ImportRouter} from "./import";

export const api = router({
    import: ImportRouter,
    transaction: TransactionRouter,
});

export type IApi = typeof api;
