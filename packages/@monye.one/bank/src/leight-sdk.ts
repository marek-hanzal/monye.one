import {
    withSdk,
    withSourceGenerators,
    withSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withSourceGenerators(
        withSourceGeneratorsEntity({
            name:     "Bank",
            packages: {
                prisma: "@monye.one/prisma",
            },
            sorts:    [
                "account",
            ],
        })
    )
);
