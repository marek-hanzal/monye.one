import {
    withSdk,
    withSourceGenerators
} from "@leight/sdk";

void withSdk(
    withSourceGenerators({
        PrismaSource: {
            entities: [
                {
                    name:         "Keyword",
                    packages:     {
                        prisma: "@leight/prisma",
                    },
                    withSchemaEx: {
                        filter: {
                            type:        "KeywordFilterSchema",
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
