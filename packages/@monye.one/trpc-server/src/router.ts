import { initTRPC } from "@trpc/server";
import { parse, stringify } from "devalue";
import superjson from "superjson";
import { type IContext } from "@leight/trpc";

const t = initTRPC.context<IContext>().create({
    transformer: {
        input: superjson,
        output: {
            serialize: (object) => stringify(object),
            deserialize: (object) => parse(object),
        },
    },
    errorFormatter({ shape }) {
        return shape;
    },
});

export const { router, procedure } = t;
