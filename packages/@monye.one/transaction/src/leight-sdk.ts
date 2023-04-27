import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:     "Transaction",
                    packages: {
                        prisma: "@monye.one/prisma",
                    },
                },
                {
                    name:     "TransactionKeyword",
                    packages: {
                        prisma: "@monye.one/prisma",
                    },
                },
            ],
        },
        Form:         {
            forms: [
                {
                    name: "TransactionFilter",
                },
            ],
        },
    })
);
