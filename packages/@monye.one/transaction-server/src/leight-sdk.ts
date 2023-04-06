import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(withServerSourceGenerators({
    entities: [
        {
            name:     "Transaction",
            prisma:   "transaction",
            packages: {
                schema: "@monye.one/transaction",
            },
        }
    ],
    packages: {
        prisma: "@monye.one/prisma",
    },
}));
