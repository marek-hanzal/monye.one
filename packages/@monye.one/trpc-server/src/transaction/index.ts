import {router}       from "../router";
import {SourceRouter} from "./source";

export const TransactionRouter = router({
    source: SourceRouter,
});
