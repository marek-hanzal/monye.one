import {
    withSdk,
    withSourceGenerators,
    withSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withSourceGenerators(
        withSourceGeneratorsEntity({
            name:     "Keyword",
            packages: {
                prisma: "@leight/prisma",
            },
        })
    )
);
