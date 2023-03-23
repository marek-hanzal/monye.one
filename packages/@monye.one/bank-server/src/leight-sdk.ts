import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(withServerSourceGenerators({
    entity:   "Bank",
    packages: {
        schema: "@monye.one/bank",
        prisma: "@monye.one/prisma",
    },
    prisma:   "bank",
}));
