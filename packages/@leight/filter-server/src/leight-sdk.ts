import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:     "Filter",
                    packages: {
                        schema: "@leight/filter",
                        prisma: "@leight/prisma",
                    },
                    prisma:   "filter",
                },
            ],
        },
        Source:       {
            entities: [
                {
                    name:     "Filter",
                    packages: {
                        schema: "@leight/filter",
                    },
                },
            ],
        },
    })
);
