import { publicProcedure, router } from "./router";
import { ImportRouter } from "./import";

export const appRouter = router({
    foo: publicProcedure.query((): string[] => {
        return ["a", "b", "c"];
    }),
    import: ImportRouter,
});

export type AppRouter = typeof appRouter;
