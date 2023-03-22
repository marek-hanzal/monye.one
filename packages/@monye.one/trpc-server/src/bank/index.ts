import {router}       from "../router";
import {SourceRouter} from "./source";

export const BankRouter = router({
    source: SourceRouter,
});
