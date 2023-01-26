import { type AppRouter } from "@monye.one/trpc-server";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

export const trpc = createTRPCNext<AppRouter>({
    config() {
        const resolveApiUrl = (): string =>
            typeof window !== "undefined"
                ? ""
                : `http://localhost:${process.env.PORT ?? 3000}`;
        return {
            transformer: superjson,
            links: [
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === "development" ||
                        (opts.direction === "down" &&
                            opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: `${resolveApiUrl()}/api/trpc`,
                }),
            ],
            queryClientConfig: {
                defaultOptions: {
                    queries: {
                        keepPreviousData: true,
                    },
                },
            },
        };
    },
    ssr: false,
});

export type RouterInputTypes = inferRouterInputs<AppRouter>;
export type RouterOutputTypes = inferRouterOutputs<AppRouter>;
