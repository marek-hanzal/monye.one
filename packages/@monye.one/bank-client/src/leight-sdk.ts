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
                path:    "bank",
                package: "@monye.one/trpc-client",
            },
        })
    )
);
