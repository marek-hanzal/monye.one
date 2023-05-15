import {BankRouter}        from "./bank";
import {BookRouter}        from "./book";
import {FilterRouter}      from "./filter";
import {ImportRouter}      from "./import";
import {JobRouter}         from "./job";
import {LabelRouter}       from "./label";
import {router}            from "./router";
import {TransactionRouter} from "./transaction";

export const api = router({
    import:      ImportRouter,
    job:         JobRouter,
    bank:        BankRouter,
    book:        BookRouter,
    transaction: TransactionRouter,
    filter:      FilterRouter,
    label:       LabelRouter,
});

export type IApi = typeof api;
