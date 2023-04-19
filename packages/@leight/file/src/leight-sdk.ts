import {
    withSdk,
    withSourceGenerators,
    withSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withSourceGenerators(
        withSourceGeneratorsEntity({
            name:     "File",
            packages: {
                prisma: "@leight/prisma",
            },
        })
    )
);
