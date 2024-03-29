import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators({
        Form:           {
            forms: [
                {
                    name:        "BankCreate",
                    translation: {
                        namespace: "bank",
                    },
                    withTrpc:    {
                        source: "Bank",
                        use:    "useCreate",
                    },
                    packages:    {
                        schema: "@monye.one/bank",
                    },
                },
                {
                    type:        "dto",
                    name:        "BankEdit",
                    translation: {
                        namespace: "bank",
                    },
                    withTrpc:    {
                        source: "Bank",
                        use:    "usePatch",
                    },
                    packages:    {
                        schema: "@monye.one/bank",
                    },
                },
                {
                    type:        "dto",
                    name:        "BankPatch",
                    translation: {
                        namespace: "bank",
                    },
                    withTrpc:    {
                        source: "Bank",
                        use:    "usePatch",
                    },
                    packages:    {
                        schema: "@monye.one/bank",
                    },
                },
            ],
        },
        Selection:      {
            selections: [
                {
                    name:     "Bank",
                    packages: {
                        schema: "@monye.one/bank",
                    },
                },
            ],
        },
        Select:         {
            selects: [
                {
                    name:     "Bank",
                    packages: {
                        schema: "@monye.one/bank",
                    },
                },
            ],
        },
        SourceTable:    {
            entities: [
                {
                    name:     "Bank",
                    packages: {
                        schema: "@monye.one/bank",
                    },
                },
            ],
        },
        Trpc:           {
            entities: [
                {
                    name:     "Bank",
                    packages: {
                        schema: "@monye.one/bank",
                    },
                    withTrpc: {
                        path:         "bank",
                        package:      "@monye.one/trpc-client",
                        invalidators: [
                            "bank.source.query",
                            "bank.source.count",
                        ],
                    },
                }
            ],
        },
        SourceStore:    {
            entities: [
                {
                    name:     "Bank",
                    packages: {
                        schema: "@monye.one/bank",
                    },
                },
            ],
        },
        SourceProvider: {
            entities: [
                {
                    name:     "Bank",
                    packages: {
                        schema: "@monye.one/bank",
                    },
                },
            ],
        },
    })
);
