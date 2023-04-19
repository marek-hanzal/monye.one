import {
    withSdk,
    withSourceGenerators,
    withSourceGeneratorsEntity
} from "@leight/sdk";

void withSdk(
    withSourceGenerators(
        withSourceGeneratorsEntity({
            name:               "User",
            packages:           {
                prisma: "@leight/prisma",
            },
            withSourceSchemaEx: {
                extends: [
                    {
                        type:        "IUserSourceEx",
                        withPackage: {
                            package: "../api",
                        }
                    },
                ],
            },
        })
    )
);
