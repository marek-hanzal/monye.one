import {
    withSdk,
    withSourceGenerators,
    withSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withSourceGenerators(
        withSourceGeneratorsEntity({
            name:               "Transaction",
            packages:           {
                prisma: "@monye.one/prisma",
            },
            sorts:              [
                "date",
                "amount",
                "reference",
            ],
            withPrismaSchemaEx: {
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
        })
    )
);
