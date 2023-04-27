import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:     "Bank",
                    prisma:   "bank",
                    packages: {
                        schema: "@monye.one/bank",
                        prisma: "@monye.one/prisma",
                    },
                },
            ],
        },
        Source:       {
            entities: [
                {
                    name:      "Bank",
                    packages:  {
                        schema: "@monye.one/bank",
                    },
                },
            ],
        },
        TrpcSource:   {
            entities: [
                {
                    name:     "Bank",
                    packages: {
                        schema: "@monye.one/bank",
                    },
                },
            ],
        },
    })
);
