import {type IApi} from "@monye.one/trpc-server";
import {httpBatchLink, loggerLink} from "@trpc/client";
import {type CreateTRPCNext, createTRPCNext} from "@trpc/next";
import superjson from "superjson";

export const trpc: CreateTRPCNext<IApi, any, any> = createTRPCNext<IApi>({
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
                        staleTime: 5 * 1000,
                        keepPreviousData: true,
                    },
                },
            },
        };
    },
    ssr: false,
});
