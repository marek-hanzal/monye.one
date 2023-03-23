import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(withClientSourceGenerators({
    entity:   "Bank",
    packages: {
        schema: "@monye.one/bank",
    },
    trpc:     {
        path:    "bank",
        package: "@monye.one/trpc-client",
    },
}));
