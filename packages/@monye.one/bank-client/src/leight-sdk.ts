import {
    withClientSourceGenerators,
    withClientSourceGeneratorsEntity,
    withSdk
} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators(
        withClientSourceGeneratorsEntity({
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
            Form:     {
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
                    },
                ],
            }
        })
    )
);
