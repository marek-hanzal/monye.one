import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:         "Transaction",
                    packages:     {
                        prisma: "@monye.one/prisma",
                    },
                    sorts:        [
                        "date",
                        "amount",
                        "reference",
                    ],
                    withSchemaEx: {
                        schema: {
                            type:        "TransactionSchemaEx",
                            withPackage: {
                                package: "../../schema",
                            },
                        },
                        filter: {
                            type:        "TransactionFilterSchemaEx",
                            withPackage: {
                                package: "../../schema",
                            },
                        },
                    },
                },
                {
                    name:         "TransactionKeyword",
                    packages:     {
                        prisma: "@monye.one/prisma",
                    },
                    withSchemaEx: {
                        filter: {
                            type:        "TransactionKeywordFilterSchemaEx",
                            withPackage: {
                                package: "../../schema",
                            },
                        },
                    },
                },
            ],
        },
        Form:         {
            forms: [
                {
                    name:   "TransactionFilter",
                    schema: {
                        values: {
                            type:        "TransactionFormFilterSchema",
                            withPackage: {
                                package: "../../schema",
                            },
                        },
                    },
                },
            ],
        },
    })
);
