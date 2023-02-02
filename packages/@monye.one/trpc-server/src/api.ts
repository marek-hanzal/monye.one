import {router} from "./router";
import {ImportRouter} from "./import";
import {TransactionRouter} from "./transaction";

export const api = router({
    import: ImportRouter,
    transaction: TransactionRouter,
});

export type IApi = typeof api;
