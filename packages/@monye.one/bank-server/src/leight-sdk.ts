import {
    withPrismaEntitySource,
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators(
        withPrismaEntitySource({
            entity:   "Bank",
            prisma:   "bank",
            packages: {
                schema: "@monye.one/bank",
                prisma: "@monye.one/prisma",
            },
        })
    )
);
