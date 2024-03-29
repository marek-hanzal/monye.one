import {BankRouter} from "./bank";
import {BookRouter} from "./book";
import {ImportRouter} from "./import";
import {JobRouter} from "./job";
import {router} from "./router";
import {TransactionRouter} from "./transaction";
import {FilterRouter} from "./filter";

export const api = router({
    import: ImportRouter,
    job: JobRouter,
    bank: BankRouter,
    book: BookRouter,
    transaction: TransactionRouter,
    filter: FilterRouter,
});

export type IApi = typeof api;
