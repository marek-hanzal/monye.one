import {type IContext} from "@leight/trpc";
import {initTRPC}      from "@trpc/server";
import superjson       from "superjson";

const t = initTRPC.context<IContext>().create({
    transformer: superjson,
});

export const {router, procedure} = t;
