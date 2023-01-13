import {type Context} from "@/monye.one/server/trpc/context";
import {initTRPC}     from "@trpc/server";
import superjson      from "superjson";

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({shape}) {
        return shape;
    },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({next}) => {
    // if (!ctx.session || !ctx.session.user) {
    //     throw new TRPCError({code: "UNAUTHORIZED"});
    // }
    return next({
        ctx: null,
    });
});

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);
