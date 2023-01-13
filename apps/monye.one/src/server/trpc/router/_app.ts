import {authRouter}    from "@/monye.one/server/trpc/router/auth";
import {exampleRouter} from "@/monye.one/server/trpc/router/example";
import {router}        from "@/monye.one/server/trpc/trpc";

export const appRouter = router({
    example: exampleRouter,
    auth:    authRouter,
});

export type AppRouter = typeof appRouter;
