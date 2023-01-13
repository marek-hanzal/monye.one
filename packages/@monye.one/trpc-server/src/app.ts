import {
    publicProcedure,
    router
} from "./router";

export const appRouter = router({
    foo: publicProcedure.query((): string[] => {
        return [
            "a",
            "b",
            "c"
        ];
    })
    // example: exampleRouter,
    // auth:    authRouter,
});

export type AppRouter = typeof appRouter;
