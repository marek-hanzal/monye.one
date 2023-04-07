import {
    withSdk,
    withServerSourceGenerators,
    withServerSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators(
        withServerSourceGeneratorsEntity({
            entity:   "Transaction",
            prisma:   "transaction",
            packages: {
                schema: "@monye.one/transaction",
                prisma: "@monye.one/prisma",
            },
        })
    )
);
