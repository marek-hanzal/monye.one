import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(withSourceGenerators({
    modelName:    "Bank",
    PrismaSchema: "@monye.one/prisma",
    sorts:        [
        "account",
    ],
}));
