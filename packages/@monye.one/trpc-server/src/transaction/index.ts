import {router}       from "../router";
import {ImportRouter} from "./import";
import {SourceRouter} from "./source";

export const TransactionRouter = router({
    source: SourceRouter,
    import: ImportRouter,
});
