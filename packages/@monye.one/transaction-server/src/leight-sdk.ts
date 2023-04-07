import {
    withPrismaEntitySource,
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators(
        withPrismaEntitySource({
            entity:   "Transaction",
            prisma:   "transaction",
            packages: {
                schema: "@monye.one/transaction",
                prisma: "@monye.one/prisma",
            },
        })
    )
);
