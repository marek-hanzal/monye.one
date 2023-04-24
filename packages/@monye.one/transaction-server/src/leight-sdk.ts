import {
    withSdk,
    withServerSourceGenerators
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:        "Transaction",
                    prisma:      "transaction",
                    packages:    {
                        schema: "@monye.one/transaction",
                        prisma: "@monye.one/prisma",
                    },
                    withInclude: {
                        bank: true,
                    },
                },
                {
                    name:     "TransactionKeyword",
                    prisma:   "transactionKeyword",
                    packages: {
                        schema: "@monye.one/transaction",
                        prisma: "@monye.one/prisma",
                    },
                },
            ],
        },
        Source:       {
            entities: [
                {
                    name:     "Transaction",
                    packages: {
                        schema: "@monye.one/transaction",
                    },
                    sourceEx: {
                        type:        "TransactionSourceEx",
                        withPackage: {
                            package: "../../source",
                        },
                    },
                    withPrisma: true,
                },
                {
                    name:     "TransactionKeyword",
                    packages: {
                        schema: "@monye.one/transaction",
                    },
                    withPrisma: true,
                },
            ],
        },
        BaseSource:   {
            entities: [
                {
                    name:     "Transaction",
                    packages: {
                        schema: "@monye.one/transaction",
                    },
                },
            ],
        },
        TrpcSource:   {
            entities: [
                {
                    name:     "Transaction",
                    packages: {
                        schema: "@monye.one/transaction",
                    },
                },
            ],
        },
    })
);
