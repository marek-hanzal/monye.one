import {
    withSdk,
    withSourceGenerators,
    withSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withSourceGenerators(
        withSourceGeneratorsEntity({
            name:               "Bank",
            packages:           {
                prisma: "@monye.one/prisma",
            },
            withPrismaSchemaEx: {
                toCreate: {
                    type:        "BankToCreateSchemaEx",
                    withPackage: {
                        package: "../schema",
                    }
                },
            },
            sorts:              [
                "account",
            ],
        })
    )
);
