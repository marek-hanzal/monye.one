import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:     "Filter",
                    packages: {
                        prisma: "@leight/prisma",
                    },
                },
            ],
        },
    })
);
