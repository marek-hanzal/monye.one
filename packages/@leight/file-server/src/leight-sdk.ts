import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:     "File",
                    packages: {
                        schema: "@leight/file",
                        prisma: "@leight/prisma",
                    },
                    prisma:   "file",
                },
            ],
        },
        Source:       {
            entities: [
                {
                    name:     "File",
                    packages: {
                        schema: "@leight/file",
                    },
                },
            ],
        },
    })
);
