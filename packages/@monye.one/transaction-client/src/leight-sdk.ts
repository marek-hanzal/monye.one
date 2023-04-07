import {
    withClientSourceGenerators,
    withClientSourceGeneratorsEntity,
    withSdk
} from "@leight/sdk";

void withSdk(
    withClientSourceGenerators(
        withClientSourceGeneratorsEntity({
            name:     "Transaction",
            packages: {
                schema: "@monye.one/transaction",
            },
            withTrpc: {
                path:    "transaction",
                package: "@monye.one/trpc-client",
            },
        })
    )
);
