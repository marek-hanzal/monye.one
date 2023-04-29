import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:         "Job",
                    packages:     {
                        prisma: "@leight/prisma",
                    },
                },
            ],
        },
    })
);
