import {env}                  from "@/monye.one/env/server.mjs";
import {createContext}        from "@/monye.one/server/trpc/context";
import {appRouter}            from "@/monye.one/server/trpc/router/_app";
import {createNextApiHandler} from "@trpc/server/adapters/next";

export default createNextApiHandler({
    router: appRouter,
    createContext,
    onError:
            env.NODE_ENV === "development"
                ? ({path, error}) => {
                    console.error(`❌ tRPC failed on ${path}: ${error}`);
                }
                : undefined,
});
