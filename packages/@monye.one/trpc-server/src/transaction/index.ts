import {router}                  from "../router";
import {TransactionSourceRouter} from "../sdk/ServerTrpc/TransactionTrpcRouter";
import {ImportRouter}            from "./import";

export const TransactionRouter = router({
    source: TransactionSourceRouter,
    import: ImportRouter,
});
