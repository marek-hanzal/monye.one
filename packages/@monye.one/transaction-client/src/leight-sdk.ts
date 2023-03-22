import {
    withClientSourceGenerators,
    withSdk
} from "@leight/sdk";

void withSdk(withClientSourceGenerators({
    modelName:     "Transaction",
    schemaPackage: "@monye.one/transaction",
    trpcPackage:   "@monye.one/trpc-client",
    trpcPath:      "transaction",
}));
