import {
    withSdk,
    withServerSourceGenerators,
    withServerSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withServerSourceGenerators(
        withServerSourceGeneratorsEntity({
            disabled:     ["trpc"],
            name:         "User",
            packages:     {
                schema: "@leight/user",
                prisma: "@leight/prisma",
            },
            prisma:       "user",
            withSourceEx: {
                type:        "UserSourceEx",
                withPackage: {
                    package: "../source",
                },
            },
        })
    )
);
