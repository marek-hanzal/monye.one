import {router} from "./router";
import {ImportRouter} from "./import";

export const api = router({
    import: ImportRouter,
});

export type IApi = typeof api;
