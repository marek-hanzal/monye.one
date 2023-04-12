import {
    withSdk,
    withServerSourceGenerators,
    withServerSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators(
        withServerSourceGeneratorsEntity({
            name:         "Transaction",
            prisma:       "transaction",
            withSourceEx: {
                type:        "TransactionSourceEx",
                withPackage: {
                    package: "../source",
                },
            },
            packages:     {
                schema: "@monye.one/transaction",
                prisma: "@monye.one/prisma",
            },
            withInclude:  {
                bank: true,
            },
        })
    )
);
