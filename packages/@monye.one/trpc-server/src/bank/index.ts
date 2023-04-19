import {router}           from "../router";
import {BankSourceRouter} from "../sdk";

export const BankRouter = router({
    source: BankSourceRouter,
});
