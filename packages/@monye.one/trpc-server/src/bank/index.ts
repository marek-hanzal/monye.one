import {router}           from "../router";
import {BankSourceRouter} from "../sdk/ServerTrpc/BankTrpcRouter";

export const BankRouter = router({
    source: BankSourceRouter,
});
