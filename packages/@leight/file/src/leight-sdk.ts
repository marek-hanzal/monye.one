import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:         "File",
                    packages:     {
                        prisma: "@leight/prisma",
                    },
                    withSchemaEx: {
                        filter: {
                            type:        "FileFilterSchemaEx",
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
