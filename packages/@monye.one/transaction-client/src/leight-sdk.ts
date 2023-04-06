import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(withClientSourceGenerators({
    entities: [
        {
            name: "Transaction",
            trpc: {
                package: "@monye.one/trpc-client",
                path:    "transaction",
            },
        }
    ],
    packages: {
        schema: "@monye.one/transaction",
    },
}));
