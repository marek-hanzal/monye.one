import {
    withSdk,
    withServerSourceGenerators,
    withServerSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators(
        withServerSourceGeneratorsEntity({
            name:     "Bank",
            prisma:   "bank",
            packages: {
                schema: "@monye.one/bank",
                prisma: "@monye.one/prisma",
            },
        })
    )
);
