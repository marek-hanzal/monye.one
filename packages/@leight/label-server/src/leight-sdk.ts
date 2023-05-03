import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:     "Label",
                    packages: {
                        schema: "@leight/label",
                        prisma: "@leight/prisma",
                    },
                    prisma:   "label",
                },
            ],
        },
        Source:       {
            entities: [
                {
                    name:     "Label",
                    packages: {
                        schema: "@leight/label",
                    },
                },
            ],
        },
        TrpcSource:   {
            entities: [
                {
                    name:     "Label",
                    packages: {
                        schema: "@leight/label",
                    },
                },
            ],
        }
    })
);
