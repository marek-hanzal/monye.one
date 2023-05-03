import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:     "Label",
                    packages: {
                        prisma: "@leight/prisma",
                    },
                },
            ],
        },
    })
);
