import {
    publicProcedure,
    router
} from "@/monye.one/server/trpc/trpc";

export const authRouter = router({
    getSession: publicProcedure.query(() => {
        return null;
    }),
});
