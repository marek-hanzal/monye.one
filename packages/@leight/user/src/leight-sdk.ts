import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:         "User",
                    packages:     {
                        prisma: "@leight/prisma",
                    },
                },
            ],
        },
    })
);
