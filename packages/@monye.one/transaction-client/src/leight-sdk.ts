import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(withClientSourceGenerators({
    entity:   "Transaction",
    packages: {
        schema: "@monye.one/transaction",
    },
    trpc:     {
        package: "@monye.one/trpc-client",
        path:    "transaction",
    },
}));
