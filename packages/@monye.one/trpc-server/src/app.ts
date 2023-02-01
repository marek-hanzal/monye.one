import {router} from "./router";
import {ImportRouter} from "./import";

export const appRouter = router({
    import: ImportRouter,
});

export type AppRouter = typeof appRouter;
