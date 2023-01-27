import { type IContext, type ICreateContext } from "@leight/trpc";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { type AnyRouter } from "@trpc/server";

export const createHandler = <
    TRouter extends AnyRouter,
    TContext extends IContext
>(
    router: TRouter,
    createContext: ICreateContext<TContext>
) =>
    createNextApiHandler({
        router,
        createContext,
        onError:
            process.env.NODE_ENV === "development"
                ? ({ path, error }) =>
                      console.error(`❌ tRPC failed on ${path}: ${error}`)
                : undefined,
        batching: {
            enabled: true,
        },
    });
