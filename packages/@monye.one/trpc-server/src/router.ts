import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { type IContext } from "@leight/trpc";

const t = initTRPC.context<IContext>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});

export const { router, middleware, procedure } = t;

export const publicProcedure = procedure;
export const protectedProcedure = procedure.use(
    middleware(({ next }) => {
        // if (!ctx.session || !ctx.session.user) {
        //     throw new TRPCError({code: "UNAUTHORIZED"});
        // }
        return next({
            ctx: null,
        });
    })
);
