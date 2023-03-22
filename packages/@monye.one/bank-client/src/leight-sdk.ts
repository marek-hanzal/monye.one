import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(withClientSourceGenerators({
    modelName:     "Bank",
    schemaPackage: "@monye.one/bank",
    trpcPackage:   "@monye.one/trpc-client",
    trpcPath:      "bank",
}));
