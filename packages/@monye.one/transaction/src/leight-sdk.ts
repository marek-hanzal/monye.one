import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(withSourceGenerators({
    entity:   "Transaction",
    packages: {
        prisma: "@monye.one/prisma",
    },
    sorts:    [
        "date",
        "amount",
        "reference",
    ],
}));
