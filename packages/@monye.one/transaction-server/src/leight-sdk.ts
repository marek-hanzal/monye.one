import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(withServerSourceGenerators({
    entity:   "Transaction",
    packages: {
        schema: "@monye.one/transaction",
        prisma: "@monye.one/prisma",
    },
    prisma:   "transaction",
}));
