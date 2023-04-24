import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators({
        SourceStore:    {
            entities: [
                {
                    name:     "Transaction",
                    packages: {
                        schema: "@monye.one/transaction",
                    },
                },
            ],
        },
        SourceProvider: {
            entities: [
                {
                    name:     "Transaction",
                    packages: {
                        schema: "@monye.one/transaction",
                    },
                    withTrpc: true,
                },
            ],
        },
        SourceTable:    {
            entities: [
                {
                    name:     "Transaction",
                    packages: {
                        schema: "@monye.one/transaction",
                    },
                },
            ],
        },
        Trpc:           {
            entities: [
                {
                    name:     "Transaction",
                    packages: {
                        schema: "@monye.one/transaction",
                    },
                    withTrpc: {
                        path:    "transaction",
                        package: "@monye.one/trpc-client",
                    },
                },
            ],
        },
    })
);
