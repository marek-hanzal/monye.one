import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(withServerSourceGenerators({
    entities: [
        {
            name:     "Bank",
            prisma:   "bank",
            packages: {
                schema: "@monye.one/bank",
            }
        },
    ],
    packages: {
        prisma: "@monye.one/prisma",
    },
}));
