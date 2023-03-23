import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(withSourceGenerators({
    entity:   "Bank",
    packages: {
        prisma: "@monye.one/prisma",
    },
    sorts:    [
        "account",
    ],
}));
