import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(withSourceGenerators({
    modelName:    "Transaction",
    PrismaSchema: "@monye.one/prisma",
    sorts:        [
        "date",
        "amount",
        "reference",
    ],
}));
