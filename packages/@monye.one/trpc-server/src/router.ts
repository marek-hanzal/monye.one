import {initTRPC} from "@trpc/server";
import superjson from "superjson";
import {type IContext} from "@leight/trpc";

const t = initTRPC.context<IContext>().create({
    transformer: superjson,
});

export const {router, procedure} = t;
