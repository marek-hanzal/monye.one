import {
    withSdk,
    withServerSourceGenerators,
    withServerSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators(
        withServerSourceGeneratorsEntity({
            disabled: ["trpc"],
            name:     "Keyword",
            packages: {
                schema: "@leight/keyword",
                prisma: "@leight/prisma",
            },
            prisma:   "keyword",
        })
    )
);
