import {
    withSdk,
    withServerSourceGenerators,
    withServerSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators(
        withServerSourceGeneratorsEntity({
            name:         "Bank",
            prisma:       "bank",
            withSourceEx: {
                type:        "BankSourceEx",
                withPackage: {
                    package: "../source",
                },
            },
            packages:     {
                schema: "@monye.one/bank",
                prisma: "@monye.one/prisma",
            },
        })
    )
);
