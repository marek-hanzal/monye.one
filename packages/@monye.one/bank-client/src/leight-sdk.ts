import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(withClientSourceGenerators({
    entities: [
        {
            name: "Bank",
            trpc: {
                path:    "bank",
                package: "@monye.one/trpc-client",
            },
        }
    ],
    packages: {
        schema: "@monye.one/bank",
    },
}));
